#!/usr/bin/env python
# --*-- coding:utf-8 --*--
# Author: Jack.Z

import tornado.ioloop
import tornado.web
import tornado.httpserver
import tornado.options
import os
import torndb
from tornado.options import define, options
from urls import urlpatterns

define('port', default='8000', help='Listening port', type=int)
define("mysql_host", default="10.10.160.1:3306", help="database host")
define("mysql_database", default="DMS", help="database name")
define("mysql_user", default="root", help="database user")
define("mysql_password", default="luckjackZ", help="database password")

# settings
settings = dict(
    cookie_secret="TTEip4KsQ9W6HDz01VOXuIl8XKC2kEq7klBOfI27DgA=",
    xsrf_cookies=True,
    template_path=os.path.join(os.path.dirname(__file__), "templates"),
    static_path=os.path.join(os.path.dirname(__file__), "static"),
    upload_path=os.path.join(os.path.dirname(__file__), "uploads"),
)


class Application(tornado.web.Application):
    def __init__(self):
        super(Application, self).__init__(urlpatterns, **settings)
        self.db = torndb.Connection(
            host=options.mysql_host,
            database=options.mysql_database,
            user=options.mysql_user,
            password=options.mysql_password)

# socket server
if __name__ == '__main__':
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(options.port)
    print("Server Start on port: {}".format(options.port))
    tornado.ioloop.IOLoop.current().start()
