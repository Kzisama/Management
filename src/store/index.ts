import useUserStore from "@/store/user";

export default function useStore() {
  return {
    userStore: useUserStore(),
  };
}
