#!/usr/bin/python
# --*-- coding: utf-8 --*--
# author: Jack.Z


import tornado.web


class BaseHandler(tornado.web.RequestHandler):

    def data_received(self, chunk):
        pass

    @property
    def db(self):
        return self.application.db

    def get_current_user(self):
        return self.get_secure_cookie("user")

    def any_user_exists(self):
        return bool(self.db.get("SELECT * FROM dms_auth LIMIT 1"))
