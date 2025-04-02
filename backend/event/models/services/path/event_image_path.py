from time import gmtime, strftime

from basis.services.gen_random_filename import gen_random_filename


def event_image_path(instance, filename):
    return f'event_image/{strftime("%Y/%m/%d/", gmtime())}/{gen_random_filename(current_filename=filename)}'
