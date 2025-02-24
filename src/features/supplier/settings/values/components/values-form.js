"use client";

import { CheckboxField } from "@/components/checkbox-field";
import { SubmitButton } from "@/components/submit-button";
import { Toast } from "@/components/toast";
import { useFormState } from "react-dom";
import { values } from "../server/actions/values";

export function ValuesForm({ settings }) {
  const [state, formAction] = useFormState(values, undefined);

  return (
    <form action={formAction}>
      <div className="grid gap-2 sm:grid-cols-12 sm:gap-4">
        <CheckboxField
          id="made_in_us"
          label="Made in United States"
          helperText="The product is manufactured in the United States."
          defaultChecked={settings.made_in_us}
        />
        <CheckboxField
          id="made_in_canada"
          label="Made in Canada"
          helperText="The product is manufactured in Canada."
          defaultChecked={settings.made_in_canada}
        />
        <CheckboxField
          id="fair_trade"
          label="Fair trade"
          helperText="Products created and sourced in a way that treats all workers on the supply chain fairly."
          defaultChecked={settings.fair_trade}
        />
        <CheckboxField
          id="organic"
          label="Organic"
          helperText="Products created free from pesticides, chemical fertilizers, or other artificial ingredients."
          defaultChecked={settings.organic}
        />
        <CheckboxField
          id="handmade"
          label="Handmade"
          helperText="Handcrafted products made with love."
          defaultChecked={settings.handmade}
        />
        <CheckboxField
          id="kosher"
          label="Kosher certified"
          helperText="Products made in a way that is conscious of Jewish law."
          defaultChecked={settings.kosher}
        />
        <CheckboxField
          id="non_gmo"
          label="Non-GMO"
          helperText="Products made without GMOs - any plant or animal that has been altered using genetic engineering techniques."
          defaultChecked={settings.non_gmo}
        />
        <CheckboxField
          id="women_owned"
          label="Women owned business"
          helperText="The business is at least 51 percent owned, operated, and controlled by a woman or women."
          defaultChecked={settings.women_owned}
        />
        <CheckboxField
          id="vegan"
          label="Vegan"
          helperText="Products made free from animal ingredients."
          defaultChecked={settings.vegan}
        />
        <CheckboxField
          id="eco_friendly"
          label="Eco friendly"
          helperText="Products made free from practices or ingredients that are harmful to our planet."
          defaultChecked={settings.eco_friendly}
        />
        <CheckboxField
          id="social_good"
          label="Social good"
          helperText="Brands and companies who give back to their communities, advocate for their workers, and make a positive impact on the world."
          defaultChecked={settings.social_good}
        />
        <CheckboxField
          id="small_batch"
          label="Small batch"
          helperText="Products are made in small batches, not mass-produced in a big factory."
          defaultChecked={settings.small_batch}
        />
      </div>
      <Toast message={state?.message} error={state?.error} />
      <div className="mt-5 flex justify-end gap-x-2">
        <SubmitButton>Save</SubmitButton>
      </div>
    </form>
  );
}
