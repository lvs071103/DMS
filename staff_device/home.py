#!/usr/bin/python
# --*-- coding: utf-8 --*--
# author Jack.Z

from base import BaseHandler


class HomeHandler(BaseHandler):
    def get(self):
        self.write("welcome Device Manager System!")
        # entries = self.db.query("SELECT * FROM entries ORDER BY published "
        #                         "DESC LIMIT 5")
        # if not entries:
        #     self.redirect("/compose")
        #     return
        # self.render("home.html", entries=entries)
