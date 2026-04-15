export function getTitle(type, data) {
  switch (type) {
    case "character":
      return data?.name;

    case "location":
      return data?.name;

    case "episode":
      return data?.name;

    case "residents":
      return "Residents";

    default:
      return "";
  }
}