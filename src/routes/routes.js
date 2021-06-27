import React from 'react';
//-------------------------------------

const Login = React.lazy(() => import('../containers/Auth/Login'));
const ResetPassword = React.lazy(() =>
  import('../containers/Auth/ResetPassword'),
);
const UserList = React.lazy(() => import('../containers/UserList'));
const UserForm = React.lazy(() => import('../containers/UserForm'));
const UpdateMyProfile = React.lazy(() =>
  import('../containers/UpdateMyProfile'),
);
const TenantList = React.lazy(() => import('../containers/TenantList'));
const TenantForm = React.lazy(() => import('../containers/TenantForm'));

// status

const CategoriesList = React.lazy(() => import('../containers/CategoriesList'));
const CategoriesForm = React.lazy(() => import('../containers/CategoriesForm'));

const Files = React.lazy(() => import('../containers/Files'));
const FileForm = React.lazy(() => import('../containers/FileForm'));

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/reset-password/:token',
    component: ResetPassword,
  },
  {
    path: '/users',
    component: UserList,
    protected: true,
  },
  {
    path: '/users/create',
    component: UserForm,
    protected: true,
  },
  {
    path: '/users/edit/:id',
    component: UserForm,
    protected: true,
  },
  {
    path: '/me/update-profile',
    component: UpdateMyProfile,
    protected: true,
  },
  {
    path: '/tenants',
    component: TenantList,
    protected: true,
  },
  {
    path: '/tenants/create',
    component: TenantForm,
    protected: true,
  },
  {
    path: '/categories',
    component: CategoriesList,
    protected: true,
  },
  {
    path: '/categories/create',
    component: CategoriesForm,
    protected: true,
  },
  {
    path: '/files/create',
    component: FileForm,
    protected: true,
  },
  {
    path: '/categories/edit/:id',
    component: CategoriesForm,
    protected: true,
  },
  {
    path: '/my-files',
    component: Files,
    protected: true,
  },
];

export default routes;
