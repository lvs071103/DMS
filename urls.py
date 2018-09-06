#!/usr/bin/python
# --*-- coding:utf-8 --*--
# author: 'Jack.Z'

from accounts import auth
from staff_device import home

urlpatterns = [
    (r'/accounts/login/', auth.LoginHandler),
    (r'/accounts/register/', auth.RegisterHandler),
    (r'/', home.HomeHandler),
]
