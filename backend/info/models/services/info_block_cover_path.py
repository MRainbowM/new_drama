from basis.services.gen_random_filename import gen_random_filename


def info_block_cover_path(instance, filename) -> str:
    return f'info_block_cover/{gen_random_filename(current_filename=filename)}'
