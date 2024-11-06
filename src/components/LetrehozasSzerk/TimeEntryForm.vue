<script setup>
import { onMounted, ref } from 'vue';

const entries = ref([]);
const date = ref("");
const startTime = ref("");
const endTime = ref("");
const description = ref("");
const selectedTags = ref([]);
const isEditing = ref(false);
const editIndex = ref(null);

const availableTags = ['projekt', 'ügyfél', 'marketing', 'fejlesztés'];

const saveEntry = () => {
  const entry = {
    id: Date.now(),
    date: date.value,
    startTime: startTime.value,
    endTime: endTime.value,
    description: description.value,
    tags: selectedTags.value
  };

  if (isEditing.value) {
    entries.value[editIndex.value] = entry;
    isEditing.value = false;
    editIndex.value = null;
  } else {
    entries.value.push(entry);
  }

  localStorage.setItem('workEntries', JSON.stringify(entries.value));
  resetForm();
  alert("Sikeres mentés!");
};

const loadEntries = () => {
  const storedEntries = localStorage.getItem('workEntries');
  entries.value = storedEntries ? JSON.parse(storedEntries) : [];
};

const editEntry = (index) => {
  const entry = entries.value[index];
  date.value = entry.date;
  startTime.value = entry.startTime;
  endTime.value = entry.endTime;
  description.value = entry.description;
  selectedTags.value = entry.tags;
  isEditing.value = true;
  editIndex.value = index;
};

const deleteEntry = (index) => {
  entries.value.splice(index, 1);
  localStorage.setItem('workEntries', JSON.stringify(entries.value));
  alert("Bejegyzés törölve!");
};

const resetForm = () => {
  date.value = "";
  startTime.value = "";
  endTime.value = "";
  description.value = "";
  selectedTags.value = [];
};

onMounted(() => {
  loadEntries();
});
</script>

<template>
  <h1>Munkaidő nyilvántartás</h1>
  <div class="form-container">
    <div class="input-container">
      <label for="date">Dátum:</label>
      <input type="date" id="date" v-model="date">
    </div>
    <div class="input-container">
      <label for="startTime">Kezdés:</label>
      <input type="time" id="startTime" v-model="startTime">
    </div>
    <div class="input-container">
      <label for="endTime">Befejezés:</label>
      <input type="time" id="endTime" v-model="endTime">
    </div>
    <div class="input-container">
      <label for="description">Feladat leírása:</label>
      <textarea id="description" v-model="description" placeholder="Feladat leírása"></textarea>
    </div>

    <div class="input-container">
      <label for="tags">Címkék (válasszon egyet):</label>
      <select id="tags" v-model="selectedTags" multiple>
        <option v-for="tag in availableTags" :key="tag" :value="tag">{{ tag }}</option>
      </select>
    </div>

    <button class="save-button" @click="saveEntry">{{ isEditing ? 'Mentés' : 'Hozzáadás' }}</button>
  </div>
<br>
  <div class="entries-container" v-if="entries.length > 0">
    <h2>Bejegyzések adminisztrációja</h2>
    <div class="entries-grid">
      <div class="entry-card" v-for="(entry, index) in entries" :key="entry.id">
        <p><strong>Dátum:</strong> {{ entry.date }}</p>
        <p><strong>Kezdés:</strong> {{ entry.startTime }}</p>
        <p><strong>Befejezés:</strong> {{ entry.endTime }}</p>
        <p><strong>Leírás:</strong> {{ entry.description }}</p>
        <p><strong>Címkék:</strong> {{ entry.tags.join(', ') }}</p>
        <button @click="editEntry(index)">Szerkesztés</button>
        <button @click="deleteEntry(index)">Törlés</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-container, .entries-container {
  max-width: 500px;
  margin: 0 auto;
}

.input-container {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="date"], input[type="time"], textarea, select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  background-color: #006400;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
}

button:hover {
    background-color: #4fb84f;
}

h1, h2 {
  text-align: center;
}

.entries-container {
  max-width: 1000px;
  margin: 20px auto;
  padding: 10px;
}

.entries-container h2 {
  text-align: center;
  margin-bottom: 20px;
}

.entries-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}

.entry-card {
  flex-basis: calc(50% - 20px);
  max-width: calc(50% - 20px);
  border: 1px solid #ccc;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.entry-card button {
  padding: 8px 12px;
  background-color: #006400;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 5px;
}

.entry-card button:hover {
    background-color: #4fb84f;
}

@media (max-width: 768px) {
  .entry-card {
    flex-basis: 100%;
    max-width: 100%;
  }
}
</style>
