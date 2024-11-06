<template>
    <h1>Munkaidő Nyilvántartás bejegyzések</h1>
  
    <!-- Összesített munkaórák -->
    <div class="summary">
      <p><strong>Összes munkaóra:</strong> {{ totalHours.toFixed(2) }} óra</p>
      <p><strong>Átlagos napi munkaóra:</strong> {{ averageDailyHours.toFixed(2) }} óra</p>
    </div>
  
    <div class="view-selector">
      <button @click="setView('daily')">Napi</button>
      <button @click="setView('weekly')">Heti</button>
      <button @click="setView('monthly')">Havi</button>
    </div>
  
    <div class="tag-filter">
      <label for="tagFilter">Címke szűrés:</label>
      <select v-model="selectedTag" id="tagFilter">
        <option value="">Minden</option>
        <option v-for="tag in availableTags" :key="tag" :value="tag">{{ tag }}</option>
      </select>
    </div>
  
    <div class="card-container">
      <div class="card" v-for="entry in filteredEntries" :key="entry.id">
        <div class="card-content">
          <h3>Dátum: {{ entry.date }}</h3>
          <p>Kezdés: {{ entry.startTime }}</p>
          <p>Befejezés: {{ entry.endTime }}</p>
          <p>Leírás: {{ entry.description }}</p>
          <p><strong>Címkék:</strong> {{ entry.tags.join(', ') }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import dayjs from 'dayjs';
  import weekOfYear from 'dayjs/plugin/weekOfYear';
  dayjs.extend(weekOfYear);
  
  const entries = ref([]);
  const view = ref("all");
  const selectedTag = ref(""); 
  const availableTags = ['projekt', 'ügyfél', 'marketing', 'fejlesztés']; 
  
  const loadEntries = () => {
    const storedEntries = localStorage.getItem("workEntries");
    entries.value = storedEntries ? JSON.parse(storedEntries) : [];
  };
  
  const setView = (newView) => {
    view.value = newView;
  };
  
  const filteredEntries = computed(() => {
    const today = dayjs();
  
    let filtered = entries.value.filter(entry => {
      const entryDate = dayjs(entry.date);
  
      if (view.value === 'daily') {
        return entryDate.isSame(today, 'day');
      } else if (view.value === 'weekly') {
        return entryDate.week() === today.week() && entryDate.year() === today.year();
      } else if (view.value === 'monthly') {
        return entryDate.isSame(today, 'month');
      }
      return true;
    });
  
    if (selectedTag.value) {
      filtered = filtered.filter(entry => entry.tags.includes(selectedTag.value));
    }
  
    return filtered;
  });
  
  const calculateWorkedHours = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const startDate = dayjs().hour(startHour).minute(startMinute);
    const endDate = dayjs().hour(endHour).minute(endMinute);
    const duration = endDate.diff(startDate, 'minute'); 
  
    if (duration < 0) {
      return dayjs.duration(1, 'day').asMinutes() + duration;
    }
  
    return duration;
  };
  
  const totalHours = computed(() => {
    return entries.value.reduce((total, entry) => {
      const startTimes = entry.startTime.split(',');
      const endTimes = entry.endTime.split(',');
  
      startTimes.forEach((start, index) => {
        const workedMinutes = calculateWorkedHours(start.trim(), endTimes[index]?.trim());
        total += workedMinutes / 60;  
      });
      return total;
    }, 0);
  });
  
  const averageDailyHours = computed(() => {
    const total = entries.value.reduce((total, entry) => {
      const startTimes = entry.startTime.split(','); 
      const endTimes = entry.endTime.split(','); 
  
      startTimes.forEach((start, index) => {
        const workedMinutes = calculateWorkedHours(start.trim(), endTimes[index]?.trim());
        total += workedMinutes / 60; 
      });
      return total;
    }, 0);
    return total / entries.value.length;
  });
  
  onMounted(() => {
    loadEntries();
  });
  </script>
  
  <style scoped>
  h1 {
    text-align: center;
    padding: 20px;
    font-family: fantasy;
  }
  
  .summary {
    text-align: center;
    margin-bottom: 20px;
    font-size: 1.2rem;
  }
  
  .view-selector {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .view-selector button {
    margin: 0 10px;
    padding: 10px 20px;
    background-color: #006400;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .view-selector button:hover {
    background-color: #4fb84f;
  }
  
  .tag-filter {
  display: flex; 
  justify-content: center; 
  align-items: center; 
  margin-bottom: 20px;
}

.tag-filter label {
  margin-right: 10px; 
  font-size: 16px; 
}

.tag-filter select {
  padding: 10px; 
  font-size: 16px; 
  width: auto; 
  border-radius: 5px; 
  border: 2px solid #ccc;
}
  
  
  .card-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .card {
    flex-basis: calc(33% - 20px);
    max-width: calc(33% - 20px);
    margin: 10px;
    border-radius: 6px;
    box-shadow: 10px 10px 10px rgba(80, 79, 79, 0.1);
    overflow: hidden;
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid gray;
  }
  
  .card-content {
    padding: 30px;
    text-align: left;
  }
  
  .card-content h3 {
    margin-top: 0;
  }
  
  @media (max-width: 768px) {
    .card {
      flex-basis: calc(50% - 20px);
      max-width: calc(50% - 20px);
    }
  }
  </style>
  