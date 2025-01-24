from basis.services.gen_random_filename import gen_random_filename


def partner_logo_path(instance, filename) -> str:
    return f'partner_logo/{gen_random_filename(current_filename=filename)}'
