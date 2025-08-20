sap.ui.define(["sap/ui/core/UIComponent"], function (UIComponent) {
  "use strict";
  return UIComponent.extend("books.ui.Component", {
    metadata: { manifest: "json" },
    init() { UIComponent.prototype.init.apply(this, arguments); }
  });
});