import moment from "moment-timezone";

export default function getCurrentTime() {
  return moment().tz("America/Mexico_City").format("LTS");
}
