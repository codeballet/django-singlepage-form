from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse

from .models import Entry

# Create your views here.
def index(request):
    entries = Entry.objects.all()
    return render(request, "form/index.html", {
        "entries": entries
    })

def entry(request):
    if request.method == "POST":
        new_entry = request.POST["entry"]
        new_entry = Entry(entry=request.POST["entry"])
        new_entry.save()
        return HttpResponseRedirect(reverse("index"))
