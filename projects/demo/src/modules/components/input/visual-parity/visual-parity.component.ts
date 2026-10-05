import {NgForOf, NgIf} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {changeDetection} from '@demo/emulate/change-detection';
import {
    type TuiDay,
    type TuiDayRange,
    type TuiMonth,
    type TuiMonthRange,
    type TuiTime,
} from '@taiga-ui/cdk';
import {
    TuiCalendar,
    TuiCalendarYear,
    type TuiSizeL,
    type TuiSizeS,
    TuiSelectLike,
    TuiTextfield,
} from '@taiga-ui/core';
import {
    TuiCalendarMonth,
    TuiCalendarRange,
    TuiChevron,
    TuiComboBox,
    tuiCreateTimePeriods,
    TuiDataListWrapper,
    TuiFilterByInputPipe,
    TuiInputChip,
    TuiInputColor,
    TuiInputDateDirective,
    TuiInputDateMultiDirective,
    TuiInputDateRangeDirective,
    TuiInputDateTimeDirective,
    TuiInputMonthDirective,
    TuiInputMonthRangeDirective,
    TuiInputNumberDirective,
    TuiInputPhone,
    TuiInputRangeComponent,
    TuiInputSliderDirective,
    TuiInputTimeDirective,
    TuiInputYearDirective,
    TuiMultiSelect,
    TuiSelect,
    TuiSliderComponent,
    TuiTextarea,
} from '@taiga-ui/kit';
import {
    TUI_DEFAULT_INPUT_COLORS,
    TuiComboBoxModule,
    TuiInputColorModule,
    TuiInputDateModule,
    TuiInputDateMultiModule,
    TuiInputDateRangeModule,
    TuiInputDateTimeModule,
    TuiInputModule,
    TuiInputMonthModule,
    TuiInputMonthRangeModule,
    TuiInputNumberModule,
    TuiInputPhoneModule,
    TuiInputRangeModule,
    TuiInputSliderModule,
    TuiInputTagModule,
    TuiInputTimeModule,
    TuiInputYearModule,
    TuiMultiSelectModule,
    TuiPrimitiveTextfieldModule,
    TuiSelectModule,
    TuiTextareaModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/legacy';

function parityModel(key: string): unknown {
    if (key === 'multi' || key === 'tags' || key === 'dates') {
        return [];
    }

    if (key === 'text' || key === 'area' || key === 'phone') {
        return '';
    }

    return null;
}

/**
 * New and legacy `tui-input-range` share a selector, so the new one lives in its own component.
 * Temporary, remove with the stand.
 */
@Component({
    standalone: true,
    selector: 'parity-new-range',
    imports: [FormsModule, NgIf, TuiInputRangeComponent, TuiTextfield],
    template: `
        <tui-input-range
            [max]="max"
            [min]="min"
            [ngModel]="value"
            [tuiTextfieldSize]="size"
            (ngModelChange)="valueChange.emit($event)"
        >
            <label
                *ngIf="size !== 's'"
                tuiLabel
            >
                Range
            </label>
        </tui-input-range>
    `,
    changeDetection,
})
export class ParityNewRange {
    @Input()
    public value: [number, number] = [0, 0];

    @Input()
    public min = 0;

    @Input()
    public max = 0;

    @Input()
    public size: TuiSizeL | TuiSizeS = 'l';

    @Output()
    public readonly valueChange = new EventEmitter<[number, number]>();
}

/**
 * Legacy and kit `tuiMultiSelectGroup` share a selector. Keep the new dropdown
 * out of the component that imports `TuiMultiSelectModule`.
 * Temporary, remove with the stand.
 */
@Component({
    standalone: true,
    selector: 'parity-new-multi',
    imports: [
        FormsModule,
        NgIf,
        TuiChevron,
        TuiDataListWrapper,
        TuiInputChip,
        TuiMultiSelect,
        TuiTextfield,
    ],
    template: `
        <tui-textfield
            multi
            tuiChevron
            [tuiTextfieldSize]="size"
        >
            <label
                *ngIf="insideLabel"
                tuiLabel
            >
                Counterparties
            </label>
            <input
                tuiInputChip
                tuiSelectLike
                [ngModel]="value"
                [placeholder]="placeholder"
                (ngModelChange)="valueChange.emit($event)"
            />
            <ng-container *ngIf="chips">
                <tui-input-chip *tuiItem />
            </ng-container>
            <tui-data-list-wrapper
                *tuiTextfieldDropdown
                new
                tuiMultiSelectGroup
                [items]="items"
            />
        </tui-textfield>
    `,
    changeDetection,
})
export class ParityNewMulti {
    @Input()
    public value: readonly string[] = [];

    @Input()
    public items: readonly string[] = [];

    @Input()
    public size: TuiSizeL | TuiSizeS = 'l';

    @Input()
    public insideLabel = true;

    @Input()
    public chips = false;

    @Input()
    public placeholder = '';

    @Output()
    public readonly valueChange = new EventEmitter<string[]>();
}

/**
 * Temporary side-by-side stand. Remove before merge.
 */
@Component({
    standalone: true,
    selector: 'legacy-visual-parity',
    imports: [
        FormsModule,
        NgForOf,
        NgIf,
        ParityNewMulti,
        ParityNewRange,
        TuiCalendar,
        TuiCalendarMonth,
        TuiCalendarRange,
        TuiCalendarYear,
        TuiChevron,
        TuiComboBox,
        TuiComboBoxModule,
        TuiDataListWrapper,
        TuiFilterByInputPipe,
        TuiInputChip,
        TuiInputColor,
        TuiInputColorModule,
        TuiInputDateDirective,
        TuiInputDateModule,
        TuiInputDateMultiDirective,
        TuiInputDateMultiModule,
        TuiInputDateRangeDirective,
        TuiInputDateRangeModule,
        TuiInputDateTimeDirective,
        TuiInputDateTimeModule,
        TuiInputModule,
        TuiInputMonthDirective,
        TuiInputMonthModule,
        TuiInputMonthRangeDirective,
        TuiInputMonthRangeModule,
        TuiInputNumberDirective,
        TuiInputNumberModule,
        TuiInputPhone,
        TuiInputPhoneModule,
        TuiInputRangeModule,
        TuiInputSliderDirective,
        TuiInputSliderModule,
        TuiInputTagModule,
        TuiInputTimeDirective,
        TuiInputTimeModule,
        TuiInputYearDirective,
        TuiInputYearModule,
        TuiMultiSelectModule,
        TuiPrimitiveTextfieldModule,
        TuiSelect,
        TuiSelectLike,
        TuiSelectModule,
        TuiSliderComponent,
        TuiTextarea,
        TuiTextareaModule,
        TuiTextfield,
        TuiTextfieldControllerModule,
    ],
    templateUrl: './visual-parity.template.html',
    styleUrls: ['./visual-parity.style.less'],
    changeDetection,
})
export class LegacyVisualParity {
    protected readonly sizes: ReadonlyArray<TuiSizeL | TuiSizeS> = ['s', 'm', 'l'];
    protected readonly models: Record<string, unknown> = Object.fromEntries(
        [
            'text',
            'area',
            'phone',
            'select',
            'multi',
            'combo',
            'tags',
            'date',
            'dates',
            'dateRange',
            'dateTime',
            'month',
            'monthRange',
            'time',
            'year',
            'sum',
            'slider',
            'color',
        ].flatMap((key) =>
            ['s', 'm', 'l', 'out'].map((size) => [`${key}-${size}`, parityModel(key)]),
        ),
    );

    protected readonly times = tuiCreateTimePeriods(9, 18, [0, 30]);
    protected readonly items = ['Alpha', 'Beta', 'Gamma'];
    protected readonly palette = TUI_DEFAULT_INPUT_COLORS;
    protected readonly rangeMin = 0;
    protected readonly rangeMax = 20;
    protected readonly rangeSteps = 20;

    protected textFilled = 'hello@mail.com';
    protected textFilledNew = 'hello@mail.com';
    protected primitive = '';
    protected primitiveNew = '';
    protected areaNew = '';
    protected select: string | null = null;
    protected selectNew: string | null = null;
    protected selectFilled: string | null = 'Alpha';
    protected selectFilledNew: string | null = 'Alpha';
    protected multi: string[] = [];
    protected multiNew: string[] = [];
    protected multiFilled: string[] = ['Alpha'];
    protected multiFilledNew: string[] = ['Alpha'];
    protected comboNew: string | null = null;
    protected tags: string[] = [];
    protected tagsNew: string[] = [];
    protected tagsFilled: string[] = ['Alpha'];
    protected tagsFilledNew: string[] = ['Alpha'];
    protected dateNew: TuiDay | null = null;
    protected datesNew: TuiDay[] = [];
    protected dateRangeNew: TuiDayRange | null = null;
    protected dateTimeNew: readonly [TuiDay, TuiTime | null] | null = null;
    protected monthNew: TuiMonth | null = null;
    protected monthRangeNew: TuiMonthRange | null = null;
    protected timeNew: TuiTime | null = null;
    protected yearNew: number | null = null;
    protected sumNew: number | null = null;
    protected sumFilled: number | null = 1200;
    protected sumFilledNew: number | null = 1200;
    protected phoneNew = '';
    protected phoneFilled = '+79991234567';
    protected phoneFilledNew = '+79991234567';
    protected range: [number, number] = [3, 15];
    protected rangeNew: [number, number] = [3, 15];
    protected sliderNew = 8;
    protected colorNew = '#ffdd2d';

    protected sPlaceholder(
        size: TuiSizeL | TuiSizeS,
        focused: boolean,
        label: string,
        placeholder: string,
    ): string {
        return size === 's' && !focused ? label : placeholder;
    }

    protected readonly stringifyTime = (item: TuiTime): string => item.toString('HH:MM');

    protected readonly matchTime = (item: TuiTime, query: string): boolean =>
        item.toString('HH:MM').includes(query);
}
