from django.contrib import admin

from ..models import Viewer


@admin.register(Viewer)
class ViewerAdmin(admin.ModelAdmin):
    list_display = ('id', 'is_enable', 'sort', 'create_at', 'update_at')
    readonly_fields = ('create_at', 'update_at')
