# Как сделать сквозной видеоплеер в Ангуляре, который будет работать на всех страницах сайта?

### 1. Создадим ангуляр проект

```ng new video-test-project```

Подключим в файле ```src/index.html``` CDN версию bootstrap
 
```<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>```
  
Возьмем готовый bootstrap шаблон [https://getbootstrap.com/docs/4.4/examples/album/](https://getbootstrap.com/docs/4.4/examples/album/)

### 2. Создадим фикстуру массив видеозаписей `src/app/video-list/mock-videos.ts`

```
export const VIDEOS = [
  {
    id: 13,
    name: 'Игра в Биссер',
    src: 'https://predanie.ru/download/uploads/ftp/filonenko-aleksandr-/antropologiya-igry/antropologiya-igry-1-aleksandr-filonenko-igra-v-biser.mp4',
    time: '60 минут'
  },
  {
    id: 15,
    name: 'Лекция перед сном. Игра про бесконечность',
    src: 'https://predanie.ru/uploads/ftp/filonenko-aleksandr-/antropologiya-igry/antropologiya-igry-3-filonenko-lekciya-pered-snom-igra-pro-beskonechnost.mp4',
    time: '70 минут',
  },
  {
    id: 14,
    name: 'Великие игроки',
    src: 'https://predanie.ru/uploads/ftp/filonenko-aleksandr-/antropologiya-igry/antropologiya-igry-2-aleksandr-filonenko-velikie-igroki.mp4',
    time: '58 минут',
  },
  {
    id: 26,
    name: 'Философия общего дела Федорова кратко',
    src: 'https://predanie.ru/uploads/ftp/filonenko-aleksandr-/antropologiya-igry/antropologiya-igry-4-filonenko-filosofiya-obschego-dela-fedorova-kratko.mp4',
    time: '76 минут',
  },
  {
    id: 27,
    name: 'Идите и играйте',
    src: 'https://predanie.ru/uploads/ftp/filonenko-aleksandr-/antropologiya-igry/antropologiya-igry-5-filonenko-idite-i-igrayte.mp4',
    time: '96 минут',
  },
  {
    id: 28,
    name: 'Колокольня Джотто и собор Санта Мария дель Фьоре',
    src: 'https://predanie.ru/uploads/ftp/filonenko-aleksandr-/antropologiya-igry/antropologiya-igry-6-filonenkokolokolnya-dzhotto-i-sobor-santa-mariya-del-fore-aleksandr-filonenko.mp4',
  },
  {
    id: 37,
    name: 'За жизнь мира',
    src: 'https://predanie.ru/uploads/ftp/shmeman-aleksandr-pr/za-zhizn-mira-1/video.mp4',
    time: '76 минут',
  }
];
```

#### 3. Создадим новый компонент **video-list**
  
```ng generate component video-list```  

В файл компонента `src/app/video-list/video-list.component.ts` добавим код вызов фикстуры
 
```
import { Component, OnInit } from '@angular/core';
import { VIDEOS } from './mock-videos';
@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  videos = [];
  constructor() { }
  ngOnInit(): void {
    this.videos = VIDEOS;
  }
}
```

В шаблон компонента `src/app/video-list/video-list.component.html` добавим:

```
<div class="row">
    <div class="col-md-4" *ngFor="let video of videos">
        <div class="card mb-4 shadow-sm">
            <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg"
                 preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail">
                <title>{{video.name}}</title>
                <rect width="100%" height="100%" fill="#55595c"/>
                <text x="50%" y="50%" fill="#eceeef" dy=".3em">{{video.name}}</text>
            </svg>
            <div class="card-body">
                <p class="card-text">{{video.name}}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary">Смотреть</button>
                    </div>
                    <small class="text-muted">9 mins</small>
                </div>
            </div>
        </div>
    </div>
</div>
```

### 4. Создадим компонент для страницы видео

```ng generate component video-page```

Добавим в код компонента `src/app/video-page/video-page.component.ts`

```
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VIDEOS } from '../video-list/mock-videos';
@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.css']
})
export class VideoPageComponent implements OnInit {
  video: {};
  constructor(private route:ActivatedRoute) { }
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.video = VIDEOS.find(video => video.id === id);
  }
}
```

В стиль компонента добавим:

```
.video-container {
    height: 500px;
    color:#fff;
    overflow: hidden;
}
.video-container video {
    width: 100%;
    height: 500px;
    background-color: #000;
}
.sticky {
    position: fixed;
    bottom: 10px;
    left: 10px;
    width: 300px !important;
    height: auto !important;
    z-index: 100;
}
```

Добавим роутинг в файл `src/app/app-routing.module.ts` 

```
import {VideoPageComponent} from './video-page/video-page.component';
const routes: Routes = [
  {path: 'video/:id', component: VideoPageComponent}
];
```

Не забудем добавить в `app.component.html`

```<router-outlet></router-outlet>```

Далее нам нужно сделать так, чтобы на странице видео при скролле видео фиксировалось в левом нижнем углу.
Для этого добавим в компонент `src/app/video-page/video-page.component.ts` следующий код

```
@HostListener('window:scroll', ['$event'])
  onScroll($event) {
    if ($event.currentTarget.innerWidth > 959) {
      this.sticky = $event.currentTarget.scrollY > 600;
    }
  }
```

### 5. Создадим компонент видео плеера, который будет работать даже после ухода со страницы видеозаписи

```ng generate component video-player```

добавим в код компонента src/app/video-player/video-player.component.ts

```
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Video } from '../core/video'
import { VideoPlayerService } from '../video-player/video-player.service'
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer;
  video: Video;
  constructor(
      public videoPlayerService: VideoPlayerService
  ) {  }
  ngOnInit() {
    this.videoPlayerService.setVideoPlayerElement(this.videoPlayer.nativeElement);
  }
}
```

и в шаблон компонента `src/app/video-player/video-player.component.html` добавим:

```
<div #videoPlayer id="video-player-container" class="video-container" [hidden]="videoPlayerService.isPlayerHidden"></div>
```

а также стиль

```
.video-container {
    color:#fff;
    position: fixed;
    bottom: 10px;
    left: 10px;
    height: 180px !important;
    z-index: 100;
}
.video-container video {
    height: 100% !important;
    background-color: #000;
}
```
Добавим также вызов компонента в `src/app/app.component.html`. После вызова `<router-outlet></router-outlet>`
добавим `<app-video-player></app-video-player>`

```
<div class="album py-5 bg-light">
    <div class="container">
      <router-outlet></router-outlet>
      <app-video-player></app-video-player>
    </div>
  </div>
```

### 6. Создадим также сервис с помощью которого мы будем связывать видео-плеер на странице видео и глобальный видео-плеер, который будет работать на всех страницах сайта.

```ng generate service videoPlayer```

В код сервиса `src/app/video-player.service.ts` добавим:

```
import { Injectable } from '@angular/core';
import { Video } from './core/video'
@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {
  playlist: Video[] = [];
  public playing: boolean = false;
  public current: Video;
  public isPlayerHidden: boolean = true;
  public videoPlayerElement;
  constructor() { }
  add(video: Video, videos: Video[]) {
    if (video === this.current) {
      return;
    }
    this.current = video;
    this.playlist = [];
  }
  setVideoPlayerElement(videoPlayerElement: any) {
    this.videoPlayerElement = videoPlayerElement;
  }
  getVideoPlayerElement() {
    return this.videoPlayerElement;
  }
  getVideoPlayer() {
    return this.getVideoPlayerElement().childNodes[2];
  }
  removeVideoPlayerElement(hide: boolean = false):void {
    if (hide) {
      this.isPlayerHidden = true;
    }
    try {
      this.getVideoPlayerElement()
        .removeChild(this.getVideoPlayerElement().childNodes[2])
      ;
    } catch (e) {}
  }
}
```

Поздравляем! Вы реализовали сквозной видеоплеер на AngularJS!

Весь работающий код Вы можете найти в репозитории [https://github.com/igorRovenki/angular-audio-video-test/](https://github.com/igorRovenki/angular-audio-video-test/)