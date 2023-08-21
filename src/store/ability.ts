import { defineStore } from "pinia";
export default defineStore("ability", {
  state: () => {
    return {
      spinning: false,
    };
  },
  actions: {
    getSpinning():boolean {
      return this.spinning;
    },
    setSpinning(v:boolean):void {
      this.spinning = v
      return;
    },
  },
});
