export function getShippingStatus(deactivated) {
  if (deactivated) return "error";
  return "success";
}

export function getShippingLabel(deactivated) {
  if (deactivated) return "Inactive";
  return "Active";
}
