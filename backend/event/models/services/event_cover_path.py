from time import gmtime, strftime

from basis.services.gen_random_filename import gen_random_filename


def event_cover_path(instance, filename) -> str:
    return f'event_cover/{strftime("%Y/%m/%d/", gmtime())}/{gen_random_filename(current_filename=filename)}'
