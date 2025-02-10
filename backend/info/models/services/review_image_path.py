from time import gmtime, strftime

from basis.services.gen_random_filename import gen_random_filename


def review_image_path(instance, filename) -> str:
    return f'review_image/{strftime("%Y/%m/", gmtime())}/{gen_random_filename(current_filename=filename)}'
