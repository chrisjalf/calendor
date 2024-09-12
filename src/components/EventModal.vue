<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { Modal } from "bootstrap";

export default defineComponent({
  setup(_, { expose }) {
    const eventModal = ref<Element>();
    let eventModalObj: Modal;

    function showModal() {
      eventModalObj.show();
    }

    expose({ showModal });

    onMounted(() => {
      if (eventModal.value) eventModalObj = new Modal(eventModal.value);
    });

    return { showModal, eventModal };
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
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">Body</div>
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
