import React, {Fragment, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useHistory, useParams} from 'react-router-dom';
import {useFormik} from 'formik';
import {useSnackbar} from 'notistack';
import * as yup from 'yup';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import * as api from '../common/api';
import {useApiFetchData} from '../common/hooks';
import Loading from '../components/Loading';
import BackdropLoading from '../components/BackdropLoading';
import MenuItem from '@material-ui/core/MenuItem';
//-------------------------------------

const StatusForm = React.memo((props) => {
  const {t} = useTranslation();
  const history = useHistory();
  const {enqueueSnackbar} = useSnackbar();
  const [file, setFile] = useState();

  const [depRes, status, isFetchedData] = useApiFetchData({
    resource: 'categories',
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      category_id: 1,
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Tên file không được bỏ trống'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('category_id', values.category_id);
      formData.append('newFiles', file);

      let res = await api.createResource('files', formData);

      if (res.errors) {
        formik.setErrors(res.errors);
      }
      if (res?.success) {
        enqueueSnackbar(t('update_success'), {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        });
      }
      if (res?.error) {
        enqueueSnackbar(t('update_error'), {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        });
      }
      if (res.success) {
        history.push('/my-files');
      }
    },
  });

  const onFileChange = (event) => {
    // Update the state
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const classes = useStyles();

  return (
    <Container>
      {formik.isSubmitting && <BackdropLoading />}

      <Typography variant="h5" component="h4" gutterBottom>
        {'Thêm mới File'}
      </Typography>

      <Paper
        variant="outlined"
        className={classes.form}
        component="form"
        onSubmit={formik.handleSubmit}>
        {!isFetchedData ? (
          <Loading />
        ) : (
          <Fragment>
            <Grid container justify="center">
              <Grid container>
                <Grid container className={classes.groupInput}>
                  <Grid item xs={12} md={3}>
                    <Typography variant="subtitle1">Tên File</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="outlined"
                      size="small"
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange('name')}
                      onBlur={formik.handleBlur('name')}
                      error={formik.touched.name && formik.errors.name}
                      helperText={formik.touched.name && formik.errors.name}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid container className={classes.groupInput}>
                  <Grid item xs={12} md={3}>
                    <Typography variant="subtitle1">File</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      type="file"
                      variant="outlined"
                      size="small"
                      name="file"
                      onChange={onFileChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <Grid container className={classes.groupInput}>
                  <Grid item xs={12} md={3}>
                    <Typography variant="subtitle1">Danh mục</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      select
                      variant="outlined"
                      size="small"
                      name="statusId"
                      value={formik.values.statusId}
                      onChange={formik.handleChange('statusId')}
                      onBlur={formik.handleBlur('statusId')}
                      error={formik.touched.statusId && formik.errors.statusId}
                      helperText={
                        formik.touched.statusId && formik.errors.statusId
                      }
                      fullWidth>
                      {status?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center">
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="primary"
                disableElevation>
                Upload
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                disableElevation
                onClick={() => history.goBack()}>
                Quay lại
              </Button>
            </Grid>
          </Fragment>
        )}
      </Paper>
    </Container>
  );
});

const useStyles = makeStyles((theme) => ({
  form: {
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
    },
  },
  groupInput: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
    },

    '& p': {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  fieldset: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
  buttonProgress: {
    color: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default StatusForm;
