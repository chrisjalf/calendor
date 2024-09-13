<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Modal } from "bootstrap";
import { EventImpl } from "@fullcalendar/core/internal";

import TheActionableModal from "./TheActionableModal.vue";

export default defineComponent({
  components: { TheActionableModal },
  emits: { deleteEvent: (_: string) => true },
  setup(_, { emit, expose }) {
    const eventModal = ref<Element>();
    let eventModalObj: Modal;
    let selectedEvent = ref<EventImpl>();

    const confirmationModal = ref<InstanceType<typeof TheActionableModal>>();

    function showModal(event: EventImpl) {
      selectedEvent.value = event;
      eventModalObj.show();
    }

    function promptDeleteEvent() {
      confirmationModal.value?.showModal();
    }

    function handleDeleteEvent() {
      selectedEvent.value?.remove();

      const eventId: string | null =
        selectedEvent.value?.extendedProps.id ?? null;

      if (eventId) emit("deleteEvent", eventId);
    }

    expose({ showModal });

    onMounted(() => {
      if (eventModal.value) eventModalObj = new Modal(eventModal.value);
    });

    return {
      selectedEvent,
      showModal,
      eventModal,
      confirmationModal,
      promptDeleteEvent,
      handleDeleteEvent,
    };
  },
});
</script>

<template>
  <teleport to="body">
    <div
      className="modal fade"
      tabIndex="{-1}"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="eventModal"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Event</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div class="bd-example" v-if="selectedEvent">
              <dl>
                <dt>Name</dt>
                <dd>{{ selectedEvent.title }}</dd>

                <dt v-if="selectedEvent.extendedProps.description">
                  Description
                </dt>
                <dd v-if="selectedEvent.extendedProps.description">
                  {{ selectedEvent.extendedProps.description }}
                </dd>

                <dt>Start Time</dt>
                <dd>{{ selectedEvent.start }}</dd>

                <dt v-if="selectedEvent.end">End Time</dt>
                <dd v-if="selectedEvent.end">{{ selectedEvent.end }}</dd>
              </dl>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              @click="handleDeleteEvent"
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
  <TheActionableModal
    ref="confirmationModal"
    :title="'Deleting Event'"
    :body="'This action cannot be undone. Proceed?'"
    :closeText="'Close'"
    :confirmText="'Confirm'"
    @confirm="deleteEvent"
  />
</template>

<style scoped>
.modal {
  z-index: 99999;
}
</style>
