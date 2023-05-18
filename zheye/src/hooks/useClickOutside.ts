import { ref, onMounted, onUnmounted, Ref } from "vue";

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false); // 是否点击下拉框之外的地方
  const handler = (e: MouseEvent) => {
    /*  elementRef.value ==> <div class="dropdown" ref="dropdownRef">
    e.target  ===> <li></li> */
    if (elementRef.value) {
      // mounted 之后 dropdownRef.value 才有值，所以判断一下
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false;
      } else {
        isClickOutside.value = true;
      }
    }
  };
  onMounted(() => {
    document.addEventListener("click", handler);
  });
  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });
  return isClickOutside;
};

export default useClickOutside;
