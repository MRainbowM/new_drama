from basis.services.gen_random_filename import gen_random_filename


def viewer_image_path(instance, filename) -> str:
    return f'viewer_image/{gen_random_filename(current_filename=filename)}'
