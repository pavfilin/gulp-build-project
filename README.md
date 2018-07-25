### Структура проекта gulp сборки

```
  app/            # директория с исходными файлами
    |__sass/         # scss - стили
    |__fonts/        # web - шрифты
    |__img/          # jpg - картинки, png-спрайты, фоны
    |__svg/          # svg - иконки, svg - спрайты
    |__js/           # js - скрипты
    |
    |__index.html    # страница с версткой

----------------------------------------------------
  public/          # директория с собранным проектом
```

#### консольные команды gulp сборки

```
1 - Перед запуском ниже перечисленных команд, cоздаем вышеуказанную структуру, заполянем папки файлами.
```

> gulp public

```
Копирование структуры с файлами из app/ в public/ с последующей обработкой (sass, img, svg, js)
```

```
2 - После появления папки public/ запускаем локальный сервер для слежение за изменениями файлов в app/
```

> gulp server

```
3 - Чтобы удалить созданную папку public/
```

> gulp clean
