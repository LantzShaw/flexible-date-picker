<template>
  <div>
    <template v-if="dateType.length > 1">
      <a-radio-group :value="dateTypeValue" @change="handleDateTypeSelect">
        <a-radio-button
          v-for="item in dateType"
          :key="item.name"
          :value="item.value"
        >
          {{ item.name }}</a-radio-button
        >
      </a-radio-group>
    </template>

    <div v-if="isRange" style="display: inline-block; margin-left: 8px">
      <a-range-picker
        :value="dateValue"
        :format="dateFormat"
        :mode="mode"
        :show-time="{ format: 'HH:mm:ss' }"
        :open="isRangePickerOpen"
        :disabled-date="disabledDate"
        @change="handleRangePickerChange"
        @ok="handleRangePickerOk"
        @openChange="handleRangePickerOpenChange"
        @panelChange="handleRangePickerPanelChange"
      />
    </div>

    <div v-else style="display: inline-block; margin-left: 12px">
      <a-date-picker
        :value="dateValue"
        :mode="mode"
        :format="dateFormat"
        :open="isDatePickerOpen"
        @change="handleDatePickerChange"
        @openChange="handleDatePickerOpenChange"
        @panelChange="handleDatePickerPanelChange"
      >
        <a-icon slot="suffixIcon" type="smile" />
      </a-date-picker>
    </div>

    <slot name="extra"></slot>
    <a-button
      @click="clickHandler"
      slot="extra"
      type="primary"
      style="margin: 0 12px"
      >查询</a-button
    >
    <slot name="action"></slot>
  </div>
</template>
 
<script>
import moment from "moment";

export default {
  name: "FlexibleDatePicker",
  props: {
    dateType: {
      type: Array,
      default: () => [
        { value: 0, name: "日" },
        { value: 1, name: "月" },
        { value: 2, name: "年" },
      ],
    },
    isDisabledDate: {
      type: Boolean,
      default: false,
    },
    isShowTime: {
      type: Boolean,
      default: false,
    },
    isRange: {
      type: Boolean,
      default: false,
    },
    defaultTypeValue: {
      type: Number,
      default: 0,
    },
    defaultDateValue: {
      type: String,
      default: moment().format("YYYY-MM-DD"),
    },
    dayGap: {
      type: Number,
      default: 6,
    },
    monthGap: {
      type: Number,
      default: 6,
    },
    yearGap: {
      type: Number,
      default: 6,
    },
  },

  data() {
    return {
      dateTypeValue: this.defaultTypeValue,
      mode: this.isRange ? ["date", "date"] : "date",
      dateFormat: this.isRange ? ["YYYY-MM-DD", "YYYY-MM-DD"] : "YYYY-MM-DD",
      dateValue: this.isRange
        ? [
            moment(moment(this.defaultDateValue).subtract(this.dayGap, "days")),
            moment(this.defaultDateValue),
          ]
        : moment(this.defaultDateValue),
      isDatePickerOpen: false,
      isRangePickerOpen: false,
      offsetDays: 86400000 * 1,
    };
  },

  created() {
    this.$bus.$on("test", arg => {
      console.log("arg", arg);
      this.dateValue = this.isRange
        ? [
            moment(moment(this.defaultDateValue).subtract(this.dayGap, "days")),
            moment(this.defaultDateValue),
          ]
        : moment(this.defaultDateValue);
    });
  },

  mounted() {
    this.dateModeChange(this.defaultTypeValue);
  },

  methods: {
    //根据选择的开始时间/结束时间，动态渲染要禁用的日期
    disabledDate(current) {
      if (this.isDisabledDate) {
        if (this.dateValue) {
          // const selectV = moment("YYYY-MM-DD").valueOf();

          return current && current > moment().subtract(1, "days");
        } else {
          return false;
        }
      } else {
        return false;
      }
    },

    handleRangePickerChange(value) {
      this.dateValue = value;
    },

    handleRangePickerOk(value) {
      this.dateValue = value;
    },

    handleRangePickerOpenChange(open) {
      this.isRangePickerOpen = open;
    },

    handleRangePickerPanelChange(value) {
      this.dateValue = value;
    },

    handleDatePickerPanelChange(value) {
      this.dateValue = value;

      this.isDatePickerOpen = false;
    },

    handleDatePickerOpenChange(open) {
      this.isDatePickerOpen = open;
    },

    handleDatePickerChange(date) {
      this.dateValue = date;
    },

    handleDateTypeSelect(e) {
      this.dateTypeValue = e.target.value;

      this.dateModeChange(this.dateTypeValue);

      //TODO: 触发onChange事件，给父组件传值
      this.$emit("onChange", {
        dateType: this.dateTypeValue,
        dateValue: this.dateValue,
        dateFormat: this.dateFormat,
      });
    },

    // 处理查询事件
    clickHandler() {
      //TODO: 触发onSubmit事件，给父组件传值
      this.$emit("onSubmit", {
        dateType: this.dateTypeValue,
        dateValue: this.dateValue,
        dateFormat: this.dateFormat,
      });
    },

    /**
     * @param {String} mode - 可以为dateType对应的值，默认取值为 0、1、2
     */
    dateModeChange(mode) {
      switch (mode) {
        case this.dateType[0].value:
          if (this.isRange) {
            this.mode = ["date", "date"];
            this.dateFormat = ["YYYY-MM-DD", "YYYY-MM-DD"];
            if (this.isDisabledDate) {
              this.dateValue = [
                moment(
                  moment(this.defaultDateValue)
                    .subtract(this.dayGap, "days")
                    .format("YYYY-MM-DD")
                ),
                moment(
                  moment(this.defaultDateValue)
                    .subtract(1, "days")
                    .format("YYYY-MM-DD")
                ),
              ];
            } else {
              this.dateValue = [
                moment(
                  moment(this.defaultDateValue)
                    .subtract(this.dayGap, "days")
                    .format("YYYY-MM-DD")
                ),
                moment(moment(this.defaultDateValue).format("YYYY-MM-DD")),
              ];
            }
          } else {
            this.mode = "date";
            this.dateFormat = "YYYY-MM-DD";
            this.dateValue = moment(moment().format("YYYY-MM-DD"));
          }
          break;
        case this.dateType[1].value:
          if (this.isRange) {
            this.mode = ["month", "month"];
            this.dateFormat = ["YYYY-MM", "YYYY-MM"];
            this.dateValue = [
              moment(
                moment().subtract(this.monthGap, "months").format("YYYY-MM")
              ),
              moment(moment().format("YYYY-MM")),
            ];
          } else {
            this.mode = "month";
            this.dateFormat = "YYYY-MM";
            this.dateValue = moment(moment().format("YYYY-MM"));
          }
          break;
        case this.dateType[2].value:
          if (this.isRange) {
            this.mode = ["year", "year"];
            this.dateFormat = ["YYYY", "YYYY"];
            this.dateValue = [
              moment(moment().subtract(this.yearGap, "years").format("YYYY")),
              moment(moment().format("YYYY")),
            ];
          } else {
            this.mode = "year";
            this.dateFormat = "YYYY";
            this.dateValue = moment(moment().format("YYYY"));
          }
          break;
        default:
          break;
      }
    },
  },
};
</script>