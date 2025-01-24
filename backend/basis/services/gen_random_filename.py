import os
import random
import string


def gen_random_filename(current_filename: str) -> str:
    """Генерация рандомного названия файла из латинских букв в нижнем регистре и цифр"""
    string_length = 6
    ext = os.path.splitext(current_filename)[1].lower()

    characters = string.ascii_lowercase + string.digits

    return f"{''.join(random.choices(characters, k=string_length))}{ext}"
