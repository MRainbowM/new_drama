// app/api/video/route.js
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export async function GET(request) {
    // Получаем параметр 'is_mobile' из URL или заголовков
    const { searchParams } = new URL(request.url, `http://${request.headers.get('host')}`);
    const is_mobile = searchParams.get('is_mobile');

    // Определяем путь к видео в зависимости от версии
    const videoPath = path.resolve(
        is_mobile === 'mobile'
            ? 'public/video/hero_mobile.mp4'
            : 'public/video/hero.mp4'
    );

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = request.headers.get('range');


    // Генерация ETag на основе содержимого файла
    const fileBuffer = fs.readFileSync(videoPath);
    const fileHash = crypto.createHash('md5').update(fileBuffer).digest('hex');


    // Заголовки кэширования
    const headers = new Headers({
        'Cache-Control': 'public, max-age=31536000, immutable', // Кэшировать на 1 год
        'ETag': fileHash
    });

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });

        headers.set('Content-Range', `bytes ${start}-${end}/${fileSize}`);
        headers.set('Accept-Ranges', 'bytes');
        headers.set('Content-Length', chunksize.toString());
        headers.set('Content-Type', 'video/mp4');

        return new Response(file, {
            status: 206,
            headers: headers,
        });
    } else {
        const file = fs.createReadStream(videoPath);

        headers.set('Content-Length', fileSize.toString());
        headers.set('Content-Type', 'video/mp4');

        return new Response(file, {
            status: 200,
            headers: headers,
        });
    }
}
