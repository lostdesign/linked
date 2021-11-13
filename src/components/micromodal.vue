<template>
  <div id="micromodal-1" aria-hidden="true">
    <div tabindex="-1" data-micromodal-close>
      <div role="dialog" aria-modal="true" aria-labelledby="micromodal-1-title">
        <header>
          <h2 id="micromodal-1-title">Modal Title</h2>
          <button aria-label="Close modal" data-micromodal-close></button>
        </header>

        <div id="micromodal-1-content">Modal Content</div>
      </div>
    </div>
  </div>
</template>

<script>
import MicroModal from 'micromodal'

export default {
  components: MicroModal
}
</script>
