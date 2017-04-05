import { Component, OnInit, Input, ElementRef, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { VgStates } from 'videogular2/src/core/states/vg-states';
import { IPlayable, IMediaSubscriptions } from 'videogular2/src/core/vg-media/i-playable';
import { VgEvents } from 'videogular2/src/core/events/vg-events';

@Component({
    selector: 'app-time-viewer',
    templateUrl: './time-viewer.component.html',
    styleUrls: [ './time-viewer.component.scss' ]
})
export class TimeViewerComponent implements OnInit, IPlayable {
    id: string;
    elem: any;
    time: any = { current: 0, total: 0, left: 0 };
    buffer: any = { end: 0 };
    buffered: any = { length: 1, end: end => 0 };
    canPlay: boolean = false;
    canPlayThrough: boolean = false;
    isMetadataLoaded: boolean = false;
    isWaiting: boolean = false;
    isCompleted: boolean = false;
    isLive: boolean = false;
    state: string = VgStates.VG_PAUSED;
    subscriptions: IMediaSubscriptions;

    @Input()
    duration: number;

    timer: Observable<number>;
    timerSubs: Subscription;

    constructor(private ref: ElementRef) {
        this.elem = ref.nativeElement;
        this.id = this.elem.id;
    }

    ngOnInit() {
        this.timer = TimerObservable.create(0, 10);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['duration'].currentValue) {
            this.duration = changes['duration'].currentValue * 1000;
            this.time.total = this.duration;
            this.buffer.end = this.duration;
            this.buffered.end = end => this.duration;

            this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_LOADED_METADATA));
            this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_CAN_PLAY));
            this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_CAN_PLAY_THROUGH));
        }
    }

    play() {
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_PLAY));
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_PLAYING));

        this.timerSubs = this.timer.subscribe(
            () => {
                this.currentTime += 10;

                this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_TIME_UPDATE));

                if (this.time.current >= this.time.total) {
                    this.currentTime = 0;
                    this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_ENDED));
                    this.timerSubs.unsubscribe();
                }
            }
        );
    }

    set currentTime(seconds) {
        this.time.current = seconds;
    }

    get currentTime() {
        return this.time.current;
    }

    pause() {
        this.elem.dispatchEvent(new CustomEvent(VgEvents.VG_PAUSE));
        this.timerSubs.unsubscribe();
    }
}
