from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def react(request, *args, **kwargs):
    return render(request, "index.html")
