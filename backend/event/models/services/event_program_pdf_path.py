from time import gmtime, strftime


def event_program_pdf_path(instance, filename):
    return f'event_program_pdf/{strftime("%Y/%m/%d/", gmtime())}/{filename}'
