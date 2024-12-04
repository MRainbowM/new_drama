from time import gmtime, strftime


def event_image_path(instance, filename):
    return f'event_image/{strftime("%Y/%m/%d/", gmtime())}/{filename}'
