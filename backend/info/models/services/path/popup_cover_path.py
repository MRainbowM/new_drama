from basis.services.gen_random_filename import gen_random_filename


def popup_cover_path(instance, filename) -> str:
    return f'popup_cover/{gen_random_filename(current_filename=filename)}'
