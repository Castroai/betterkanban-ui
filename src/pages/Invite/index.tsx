import { useSearchParams, Navigate } from "react-router-dom";

export const Invite = () => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const tenantid = searchParams.get("tenant");
  const email = searchParams.get("email");
  const secret = searchParams.get("secret");
  const verifySecret = (_secret: string) => {
    return true;
  };
  const urlIsValid = () => {
    if (tenantid && email && secret && verifySecret(secret)) {
      return true;
    }
    return false;
  };
  if (urlIsValid()) {
    return (
      <div>
        <div>Tenant {tenantid}</div>
        <div>email {email}</div>
        <div>secret {secret}</div>
      </div>
    );
  }
  return <Navigate to={"/"} replace={true} />;
};
