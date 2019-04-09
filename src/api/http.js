import axios from "axios";
// import Loading from "@/components/OverlayLoading/Loading";

export function fetch(
  url,
  params = {},
  method = "POST",
  { withMask = true, ...config } = {}
) {
  if (!url) {
    throw new Error("interface path not found");
  }

  let isGet = method.toUpperCase() === "GET";
  withMask && 1;
  // withMask && Loading.show();
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method,
      params: isGet ? params : "",
      data: isGet ? "" : params,
      ...config
    }).then(
      rep => {
        // withMask && Loading.hide();
        resolve(rep);
      },
      err => {
        // withMask && Loading.hide();
        reject(err);
      }
    );
  });
}

export function fetchAll(...promises) {
  // Loading.show();
  return Promise.all(promises).then(
    rep => {
      //  Loading.hide();
      return rep;
    },
    err => {
      // Loading.hide();
      return err;
    }
  );
}
