import { Button } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FilledInput from '@mui/material/FilledInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import { TbBrandAppleFilled } from 'react-icons/tb';
import { LabeledDivider } from '../LabeledDivider';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

// this is
export default function AddressForm() {
  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="first-name" required>
          First name
        </FormLabel>
        <FilledInput
          id="first-name"
          name="first-name"
          type="name"
          autoComplete="first name"
          required
        />
      </FormGrid>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="last-name" required>
          Last name
        </FormLabel>
        <FilledInput
          id="last-name"
          name="last-name"
          type="last-name"
          autoComplete="last name"
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address1" required>
          Address line 1
        </FormLabel>
        <FilledInput
          id="address1"
          name="address1"
          type="address1"
          autoComplete="shipping address-line1"
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormLabel htmlFor="address2">Address line 2</FormLabel>
        <FilledInput
          id="address2"
          name="address2"
          type="address2"
          autoComplete="shipping address-line2"
          required
        />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="city" required>
          City
        </FormLabel>
        <FilledInput id="city" name="city" type="city" autoComplete="City" required />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="state" required>
          State
        </FormLabel>
        <FilledInput id="state" name="state" type="state" autoComplete="State" required />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="zip" required>
          Zip / Postal code
        </FormLabel>
        <FilledInput id="zip" name="zip" type="zip" autoComplete="shipping postal-code" required />
      </FormGrid>
      <FormGrid item xs={6}>
        <FormLabel htmlFor="country" required>
          Country
        </FormLabel>
        <FilledInput
          id="country"
          name="country"
          type="country"
          autoComplete="shipping country"
          required
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label="Use this address for payment details"
        />
      </FormGrid>
      <FormGrid item xs={12}>
        <LabeledDivider>Or...</LabeledDivider>
      </FormGrid>
      <FormGrid item xs={12}>
        <Button
          fullWidth
          startIcon={<TbBrandAppleFilled />}
          color="secondary"
          variant="outlined"
          sx={{
            width: '100%',
            paddingY: 1,
            fontWeight: 600,
            fontSize: 'xl',
            color: 'background.default',
            backgroundColor: 'black',
            '&:hover': {
              color: 'background.default',
              backgroundColor: 'black',
            },
          }}
        >
          Pay
        </Button>
      </FormGrid>
    </Grid>
  );
}
