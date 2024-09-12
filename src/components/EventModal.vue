<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Modal } from "bootstrap";
import { EventImpl } from "@fullcalendar/core/internal";

export default defineComponent({
  setup(_, { expose }) {
    const eventModal = ref<Element>();
    let eventModalObj: Modal;
    let selectedEvent = ref<EventImpl>();

    function showModal(event: EventImpl) {
      selectedEvent.value = event;
      eventModalObj.show();
    }

    expose({ showModal });

    onMounted(() => {
      if (eventModal.value) eventModalObj = new Modal(eventModal.value);
    });

    return { selectedEvent, showModal, eventModal };
  },
});
</script>

<template>
  <teleport to="body">
    <div
      className="modal fade"
      id="{props.id}"
      tabIndex="{-1}"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="eventModal"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Title</h1>
            <h3>
              {{ JSON.stringify(selectedEvent) }}
            </h3>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Body
            <div v-if="selectedEvent?.title">{{ selectedEvent.title }}</div>
            <div v-if="selectedEvent?.extendedProps.description">
              {{ selectedEvent?.extendedProps.description }}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              closeText
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              @click="() => {}"
            >
              confirmText
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
