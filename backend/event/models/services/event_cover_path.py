from time import gmtime, strftime


def event_cover_path(instance, filename):
    return f'event_cover/{strftime("%Y/%m/%d/", gmtime())}/{filename}'
