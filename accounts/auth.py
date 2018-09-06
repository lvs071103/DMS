#!/usr/bin/python
# --*-- coding: utf-8 --*--
# author Jack.Z

import tornado.web
import bcrypt
import tornado.escape
import concurrent.futures
from base import BaseHandler
from tornado import gen


# A thread pool to be used for password hashing with bcrypt.
executor = concurrent.futures.ThreadPoolExecutor(2)


class LoginHandler(BaseHandler):

    def get(self):
        self.render('auth/login.html', error=None)

    @gen.coroutine
    def post(self):
        users = self.db.get("SELECT * FROM dms_auth WHERE username = %s",
                            self.get_argument("username"))
        if not users:
            self.render("auth/login.html", error="account not found")
            return
        hashed_password = yield executor.submit(
            bcrypt.hashpw, tornado.escape.utf8(self.get_argument("password")),
            tornado.escape.utf8(users.password)
        )
        if hashed_password == users.password:
            self.set_secure_cookie("dms_user", str(users.id))
            self.redirect(self.get_argument("next", "/"))
        else:
            self.render("auth/login.html", error="密码错误")


class RegisterHandler(BaseHandler):
    def get(self):
        self.render("auth/register.html", error=None)

    @gen.coroutine
    def post(self):

        if self.any_user_exists():
            self.render("auth/register.html", error="管理员已存在，登陆后可创建")
            return
            # raise tornado.web.HTTPError(400, "author already created")

        hashed_password = yield executor.submit(
                bcrypt.hashpw, tornado.escape.utf8(self.get_argument("password")), bcrypt.gensalt()
        )
        user_id = self.db.execute(
            "INSERT INTO dms_auth (username, password, email) "
            "VALUES (%s, %s, %s)",
            self.get_argument("username"), hashed_password, self.get_argument("email"))
        self.get_secure_cookie("dms_user", str(user_id))
        self.redirect(self.get_argument("next", '/'))


class LogoutHandler(BaseHandler):
    def data_received(self, chunk):
        pass

    def get(self):
        self.clear_cookie("user")
        self.redirect(self.get_argument("next", "/"))
