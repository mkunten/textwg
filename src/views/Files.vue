<template>
  <Toast/>
  <div>
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button
            label="New" icon="pi pi-plus" class="p-button-success mr-2"
            @click="openNew"/>
        </template>
        <template #end>
          <Button label="Export CSV" icon="pi pi-upload"
            class="p-button-help" @click="exportCSV($event)"/>
          <Button icon="pi pi-refresh" @click="onSearch()"/>
        </template>
      </Toolbar>

      <DataTable
        ref="dt"
        :value="files"
        dataKey="id"
        :rows="10"
        :filters="filters"
        :paginator="true"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks
          NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5,10,25]"
        currentPageReportTemplate="Showing {first} to {last}
          of {totalRecords} files"
        editMode="cell"
        @cell-edit-complete="onCellEditComplete"
        class="editable-cells-table"
        responsiveLayout="scroll">

        <template #header>
          <div class="table-header flex flex-column
            md:flex-row md:justiify-content-between">
            <h5 class="mb-2 md:m-0 p-as-md-center">Manage Files</h5>
            <span>
              <span class="p-input-icon-left">
                <i class="pi pi-search"/>
                <InputText
                  v-model="filters['global'].value" placeholder="Search..."/>
              </span>
            </span>
          </div>
        </template>

        <Column header="" :sortable="false" :exportable="false">
          <template #body="{ data }">
            <Button icon="pi pi-trash" iconPos="right"
              @click="confirmDeleteFile(data)"/>
          </template>
        </Column>
        <Column
          field="id" header="id" :sortable="true"
          style="min-width:2rem"></Column>
        <Column
          field="name" header="name" :sortable="true"
          style="min-width:8rem; max-width:15rem; overflow: hidden">
          <template #body="{ data, field }">
            {{ data[field] }} <i class="pi pi-pencil"/>
          </template>
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" autofocus/>
          </template>
        </Column>
        <Column
          field="path" header="path" :sortable="true"
          style="min-width:8rem; max-width:15rem; overflow: hidden"></Column>
        <Column
          field="size" header="size" :sortable="true"
          style="min-width:4rem"></Column>
        <Column
          field="sha256" header="sha256" :sortable="true"
          style="max-width:8rem; overflow: hidden"></Column>
        <Column
          field="updated" header="updated" :sortable="true"></Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="fileDialog" :style="{width: '450px'}"
      header="File Details" :modal="true" class="p-fluid">
      <div class="field">
        <label for="name">Name</label>
        <InputText
          id="name" v-model.trim="file.name" required
          placefolder="optional" autofocus
          :class="{'p-invalid': submitted && !file.name}"/>
        <small class="p-error" v-if="submitted && !file.name">
          Name is required.
        </small>
      </div>
      <TabView v-model:activeIndex="fileDialogActiveIndex">
        <TabPanel header="File">
          <div class="field">
            <label @click="fileSelect" @keydown.enter="fileSelect">
              <input
                type="file" ref="fileInput" name="file"
                @change="onFileSelect" style="display: none"/>
              <InputText
                readonly placeholder="ファイルを選んでください"
                :value="this.file.file && `${this.file.file.name} (${this.file.file.size})`"
                :class="{'p-invalid': submitted && !file.name}"/>
            </label><br/>
            <small class="p-error" v-if="submitted && (!this.file.file || !this.file.file.name)">
              File is required.
            </small>
          </div>
        </TabPanel>
        <TabPanel header="Url">
          <div class="field">
            <InputText
              id="path" v-model.trim="file.path" required="true"
              autofocus :class="{'p-invalid': submitted && !file.path}"/>
            <small class="p-error" v-if="submitted && !file.path">
              Path is required.
            </small>
          </div>
        </TabPanel>
      </TabView>
      <template #footer>
        <Button
          label="Save" icon="pi pi-check" class="p-button-text"
          @click="saveFile"/>
        <Button
          label="Cancel" icon="pi pi-times" class="p-button-text"
          @click="hideDialog"/>
      </template>
    </Dialog>

    <Dialog
      v-model:visible="editFileNameDialog" :style="{width: '450px'}"
      header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"/>
        <span v-if="file">
          Are you sure you want to change the name
          from <b>{{ file.name }}</b> to <b>{{ file.newName }}</b>?
        </span>
      </div>
      <template #footer>
        <Button
          label="Yes" icon="pi pi-check" class="p-button-text"
          @click="editFileName()"/>
        <Button
          label="No" icon="pi pi-times" class="p-button-text"
          @click="editFileNameDialog = false"/>
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteFileDialog" :style="{width: '450px'}"
      header="Confirm" :modal="true">
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem"/>
        <span v-if="file">
          Are you sure you want to delete <b>{{ file.name }}</b>?
        </span>
      </div>
      <template #footer>
        <Button
          label="Yes" icon="pi pi-check" class="p-button-text"
          @click="deleteFile"/>
        <Button
          label="No" icon="pi pi-times" class="p-button-text"
          @click="deleteFileDialog = false"/>
      </template>
    </Dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { FilterMatchMode } from 'primevue/api';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import TabPanel from 'primevue/tabpanel';
import TabView from 'primevue/tabview';
import Toast from 'primevue/toast';
import Toolbar from 'primevue/toolbar';

export default {
  name: 'files',
  components: {
    Column,
    DataTable,
    Dialog,
    InputText,
    TabPanel,
    TabView,
    Toast,
    Toolbar,
  },
  data() {
    return {
      apiFiles: 'http://localhost:1323/api/files',
      files: null,
      fileDialog: false,
      fileDialogActiveIndex: 0,
      editFileNameDialog: false,
      deleteFileDialog: false,
      file: {},
      filters: {},
      submitted: false,
    };
  },
  created() {
    this.initFilters();
  },
  mounted() {
    console.log('mounted');
    this.onSearch();
  },
  methods: {
    showSuccess(mes) {
      this.$toast.add({
        severity: 'success',
        summary: 'Successful',
        detail: mes,
        life: 3000,
      });
    },
    showError(err) {
      const mes = axios.isAxiosError(err) ? err.response.data.message : err;
      console.log('err', err);
      this.$toast.add({
        severity: 'error',
        summary: 'Error',
        detail: mes,
        life: 5000,
      });
    },
    onSearch() {
      axios.get(this.apiFiles)
        .then((res) => {
          this.files = res.data;
        })
        .catch((err) => {
          this.showError(err);
        });
    },
    openNew() {
      this.file = {};
      this.submitted = false;
      this.fileDialog = true;
    },
    hideDialog() {
      this.fileDialog = false;
      this.submitted = false;
    },
    fileSelect() {
      this.$refs.fileInput.click();
    },
    onFileSelect(event) {
      this.file.file = event.dataTransfer
        ? event.dataTransfer.files[0] : event.target.files[0];
      if (!this.file.name) {
        this.file.name = this.file.file.name;
      }
    },
    saveFile() {
      this.submitted = true;
      if (this.fileDialogActiveIndex === 0) {
        if (this.file.name && this.file.file) {
          axios.postForm(this.apiFiles, this.file)
            .then((res) => {
              this.files.push(res.data);
              this.showSuccess('registered');

              this.fileDialog = false;
              this.file = {};
            })
            .catch((err) => {
              this.showError(err);
            });
        }
      } else {
        this.file.path = this.file.path.trim();
        if (this.file.path) {
          axios.post(this.apiFiles, this.file)
            .then((res) => {
              this.files.push(res.data);
              this.showSuccess('registered');

              this.fileDialog = false;
              this.file = {};
            })
            .catch((err) => {
              this.showError(err);
            });
        }
      }
    },
    onCellEditComplete(event) {
      const { data, newValue, field } = event;
      if (field === 'name') {
        this.file = { ...data };
        const v = newValue.trim();
        if (v && v !== data[field]) {
          this.file.newName = v;
          this.editFileNameDialog = true;
        }
      }
    },
    editFileName() {
      this.file.name = this.file.newName;
      delete this.file.newName;
      axios.put(`${this.apiFiles}/${this.file.id}`, this.file)
        .then((res) => {
          this.files.forEach((file, idx) => {
            if (file.id === res.data.id) {
              this.files[idx].name = res.data.name;
              return false;
            }
            return true;
          });
          this.showSuccess(`${res.data.name} successfully updated`);
        })
        .catch((err) => {
          this.showError(err);
        })
        .finally(() => {
          this.file = {};
          this.editFileNameDialog = false;
        });
    },
    confirmDeleteFile(file) {
      this.file = file;
      this.deleteFileDialog = true;
    },
    deleteFile() {
      axios.delete(`${this.apiFiles}/${this.file.id}`)
        .then((res) => {
          this.files = this.files.filter((file) => file.id !== res.data.id);
          this.showSuccess(`${res.data.name} successfully deleted`);
        })
        .catch((err) => {
          this.showError(err);
        })
        .finally(() => {
          this.file = {};
          this.deleteFileDialog = false;
        });
    },
    exportCSV() {
      this.$refs.dt.exportCSV();
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    align-items: start;
  }
}

.file-image {
  width: 50px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .file-image {
  width: 50px;
  margin: 0 auto 2rem auto;
  display: block;
}

.confirmation-content {
display: flex;
         align-items: center;
         justify-content: center;
}
@media screen and (max-width: 960px) {
  ::v-deep(.p-toolbar) {
    flex-wrap: wrap;

    .p-button {
      margin-bottom: 0.25rem;
    }
  }
}
</style>
