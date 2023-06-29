<script setup lang="ts">
// Get the current year and month
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

// Create an array to store the weeks
const yearArray = [];

// Loop through each week of the year
for (let week = 1; week <= 52; week++) {
  const startDate = new Date(currentYear, 0, (week - 1) * 7 + 1);
  const endDate = new Date(currentYear, 0, week * 7);

  // Create an array to store the weekdays of the week
  const weekdaysArray = [];

  // Loop through each day of the week
  for (let day = 0; day < 7; day++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + day);
    const isCurrentMonth = date.getMonth() === currentMonth;

    const weekdayObject = {
      date: `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`,
      day: date.toLocaleDateString('en-US', {weekday: 'long'}),
      isCurrentMonth: isCurrentMonth,
      weekIndex: week,
      dayIndex: day
    };

    weekdaysArray.push(weekdayObject);
  }

  // Add the weekdays array to the year array
  yearArray.push(weekdaysArray);
}

const history = {
  '4-5-2023': 8,
  '5-5-2023': 4,
  '7-5-2023': 12,
}

const calculateValue = (value: string) => {
  const valueExists = history[value];
  if (valueExists) {
    if (valueExists >= 10) {
      return '#1e6823'
    }
    if (valueExists >= 7 && valueExists < 10) {
      return '#44a340'
    }
    if (valueExists >= 4 && valueExists < 7) {
      return '#8cc665'
    }
    if (valueExists <= 3) {
      return '#d6e685'
    }

  }
  return '#333344';
}
</script>

<template>
  <div class="space-y-1">
    <template v-for="week in yearArray">
      <div class="flex space-x-1">
        <template v-for="day in week">
          <button class="w-3 h-3 bg-gray-800" :style="`background: ${calculateValue(day.date)}`" @click="console.log(day)"></button>
        </template>
      </div>
    </template>
  </div>
</template>