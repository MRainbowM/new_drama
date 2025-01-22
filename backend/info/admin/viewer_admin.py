from django.contrib import admin

from ..models import Viewer


@admin.register(Viewer)
class ViewerAdmin(admin.ModelAdmin):
    readonly_fields = ('create_at', 'update_at')
