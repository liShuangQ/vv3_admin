import { HistoryMenu } from "#/menu";
import router from "@/router";
import MenuRoute from "@/store/MenuRoute";

export default {
    addTab(data:HistoryMenu){
        data.title =  data.title as string
        MenuRoute().addHistoryMenu(data)
        router.push({ path: data.selectedKeys })
        return 
    },
    confineDevelop(open:boolean) {
        if (!open) {
            return
        }
        if (window.location.href.indexOf("#debug") === -1) {
            setInterval(function () {
              (function (a) {
                return (function (a) {
                  return Function('Function(arguments[0]+"' + a + '")()');
                })(a);
              })("bugger")("de", 0, 0, 0);
            }, 2000);
          }
    }
}