import React, { JSX } from 'react';
import { Switch } from '@headlessui/react';
import { Form, Link, usePage } from '@inertiajs/react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { update } from '@/routes/didnumbers';
import Heading from '@/components/heading';
import { Textarea } from '@headlessui/react';
import { Button } from '@/components/ui/button';

interface BasicInfoProps {
    account: any;
    groupAccount: any;
    accountSource: string;
}
function BasicInfo(props: BasicInfoProps): JSX.Element {
    const [selectedAccountSource, setSelectedAccountSource] = React.useState<string>(props.accountSource);
    const [selectedTimezone, setSelectedTimezone] = React.useState<string>(props.account.timezone);
    const [selectedAnswerPhrase, setSelectedAnswerPhrase] = React.useState<string>(props.account.answerphrase);
    const [selectedAnswerPhraseColour, setSelectedAnswerPhraseColour] = React.useState<string>(props.account.did_color);
    const [showMpNumber, setShowMpNumber] = React.useState<boolean>(props.account.show_mp_number);
    const [selectedEnableTranslator, setSelectedEnableTranslator] = React.useState<boolean>(props.account.enable_translator == 1 ? true : false);
    const [selectedDisableAutofill, setSelectedDisableAutofill] = React.useState<boolean>(props.account.disable_autofill == 1 ? true : false);
    const [selectedCallerCallback, setSelectedCallerCallback] = React.useState<boolean>(props.account.caller_callback == 1 ? true : false);
    const [selectedAllowAdvancedFeature, setSelectedAllowAdvancedFeature] = React.useState<boolean>(props.account.allow_advanced_feature);
    const [selectedTakingCalls, setSelectedTakingCalls] = React.useState<boolean>(props.account.taking_calls == 1 ? true : false);
    const [selectedCompanyVisible, setSelectedCompanyVisible] = React.useState<boolean>(props.account.company_visible == 1 ? true : false);
    const [selectedAddressVisible, setSelectedAddressVisible] = React.useState<boolean>(props.account.address_visible == 1 ? true : false);
    const [selectedEmailVisible, setSelectedEmailVisible] = React.useState<boolean>(props.account.email_visible == 1 ? true : false);
    const [selectedWebsiteVisible, setSelectedWebsiteVisible] = React.useState<boolean>(props.account.website_visible == 1 ? true : false);
    const [selectedMainPhoneVisible, setSelectedMainPhoneVisible] = React.useState<boolean>(props.account.main_phone_visible == 1 ? true : false);
    const [selectedMainFaxVisible, setSelectedMainFaxVisible] = React.useState<boolean>(props.account.main_fax_visible == 1 ? true : false);
    const [selectedAltPhoneVisible, setSelectedAltPhoneVisible] = React.useState<boolean>(props.account.alt_phone_visible == 1 ? true : false);
    const [selectedRecordingMode, setSelectedRecordingMode] = React.useState<string>(props.account.recording_mode);
    const [selectedHoursVisible, setSelectedHoursVisible] = React.useState<boolean>(props.account.hours_visible == 1 ? true : false);
    return (
        <div>
            <Heading title="Basic Info" />
            <Link href={'#'} className="border-b border-black">
                Edit Basic Info
            </Link>
            <Form method="post" action={update(props.account.id)} className="mt-4">
                <div className="grid grid-cols-2 gap-6 p-4 border rounded-2xl mb-4">
                    <div className="col-span-2">
                        <Label htmlFor="name" className="mb-1 block font-medium">
                            ID:
                        </Label>
                        <div className="text-sm text-gray-700">
                            { props.account.id }
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="account_group_name" className="mb-1 block font-medium">
                            Account Group Name:
                        </Label>
                        <div className="text-sm text-gray-700">
                            { props.groupAccount.account_name }
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="account_group_number" className="mb-1 block font-medium">
                            Account Group Number:
                        </Label>
                        <div className="text-sm text-gray-700">
                            { props.groupAccount.account_num }
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="account_source" className="mb-1 block font-medium">
                            Account Source:
                        </Label>
                        <Select onValueChange={setSelectedAccountSource} value={selectedAccountSource}>
                            <SelectTrigger id="account_source" name="account_source" className="w-full">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="voicenation">Voicenation</SelectItem>
                                <SelectItem value="alphapage">Alphapage</SelectItem>
                                <SelectItem value="moneypenny">Moneypenny</SelectItem>
                                <SelectItem value="sunshine">Sunshine</SelectItem>
                            </SelectContent>
                    </Select>
                    </div>
                    <div>
                        <Label htmlFor="account_number" className="mb-1 block font-medium">
                            Account Number:
                        </Label>
                        <Input
                            id="account_number"
                            name="account_number"
                            type="text"
                            className="mt-1 block w-full"
                            defaultValue={props.account.external_key}
                        />
                    </div>
                    <div>
                        <Label htmlFor="status_options" className="mb-1 block font-medium">
                            Status Options:
                        </Label>
                        <Input
                            id="status_options"
                            name="status_options"
                            type="text"
                            className="mt-1 block w-full"
                            defaultValue={props.account.status_options}
                        />
                    </div>
                    <div>
                        <Label htmlFor="show_moneypenny_number" className="mb-1 block font-medium">
                            Show Moneypenny Number:
                        </Label>
                        <Switch
                            id="show_moneypenny_number"
                            name="show_moneypenny_number"
                            checked={showMpNumber}
                            onChange={setShowMpNumber}
                            className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                        >
                            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                        </Switch>
                    </div>
                    <div>
                        <Label htmlFor="timezone" className="mb-1 block font-medium">
                            Timezone:
                        </Label>
                        <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
                            <SelectTrigger id="timezone" name="timezone" className="w-full">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="UTC">UTC</SelectItem>
                                <SelectItem value="Europe/London">GMT</SelectItem>
                                <SelectItem value="EST">EST</SelectItem>
                                <SelectItem value="PST">PST</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="country_code" className="mb-1 block font-medium">
                            Country Code:
                        </Label>
                        <Select>
                            <SelectTrigger id="country_code" name="country_code" className="w-full">
                                Use system setting
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="US">United States</SelectItem>
                                <SelectItem value="GB">United Kingdom</SelectItem>
                                <SelectItem value="IE">Ireland</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="answerphrase" className="mb-1 block font-medium">
                            Answer Phrase:
                        </Label>
                        <Select value={selectedAnswerPhrase} onValueChange={setSelectedAnswerPhrase}>
                            <SelectTrigger id="answerphrase" name="answerphrase" className="w-full">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Thank you for calling [Company Name], this is [Name]. How may I help you?">Thank you for calling [Company Name], this is [Name]. How may I help you?</SelectItem>
                                <SelectItem value="Thank you for calling [Company Name]. How may I help you?">Thank you for calling [Company Name]. How may I help you?</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="custom_phrase" className="mb-1 block font-medium">
                            Custom Phrase:
                        </Label>
                        <Input
                            id="custom_phrase"
                            name="custom_phrase"
                            type="text"
                            className="mt-1 block w-full"
                            defaultValue={props.account.custom_phrase}
                        />
                    </div>
                    <div>
                        <Label htmlFor="answer_phrase_colour" className="mb-1 block font-medium">
                            Answer Phrase Colour:
                        </Label>
                        <Select value={selectedAnswerPhraseColour} onValueChange={setSelectedAnswerPhraseColour}>
                            
                            <SelectTrigger id="answer_phrase_colour" name="answer_phrase_colour" className="w-full">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="green">Green</SelectItem>
                                <SelectItem value="blue">Blue</SelectItem>
                                <SelectItem value="white">White</SelectItem>
                                <SelectItem value="purple">Purple</SelectItem>
                                <SelectItem value="red">Red</SelectItem>
                                <SelectItem value="yellow">Yellow</SelectItem>
                                <SelectItem value="orange">Orange</SelectItem>
                                <SelectItem value="light-green">Light Green</SelectItem>
                                <SelectItem value="pink">Pink</SelectItem>
                                <SelectItem value="grey">Grey</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="contact_name" className="mb-1 block font-medium">
                            Contact Name:
                        </Label>
                        <Input
                            id="contact_name"
                            name="contact_name"
                            type="text"
                            className="mt-1 block w-full"
                            defaultValue={props.account.contact_name}
                        />
                    </div>
                    <div>
                        <Label htmlFor="contact_email" className="mb-1 block font-medium">
                            Contact Phone:
                        </Label>
                        <Input
                            id="contact_phone"
                            name="contact_phone"
                            type="text"
                            className="mt-1 block w-full"
                            defaultValue={props.account.contact_phone}
                        />
                    </div>
                    <div>
                        <Label htmlFor="contact_email" className="mb-1 block font-medium">
                            Contact Email:
                        </Label>
                        <Input
                            id="contact_email"
                            name="contact_email"
                            type="email"
                            className="mt-1 block w-full"
                            defaultValue={props.account.contact_email}
                        />
                    </div>
                    <div>
                        <Label htmlFor="type" className="mb-1 block font-medium">
                            Type:
                        </Label>
                        <Select>
                            <SelectTrigger id="type" name="type" className="w-full">
                                Select
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="answering_service">Answering Service</SelectItem>
                                <SelectItem value="virtual_receptionist">Virtual Receptionist</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="industry" className="mb-1 block font-medium">
                            Industry:
                        </Label>
                        <Select>
                            <SelectTrigger id="industry" name="industry" className="w-full">
                                Select
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                <SelectItem value="legal">Legal</SelectItem>
                                <SelectItem value="real_estate">Real Estate</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="enable_translator" className="mb-1 block font-medium">
                            Enable Translator:
                        </Label>
                        <Switch
                            id="enable_translator"
                            name="enable_translator"
                            checked={selectedEnableTranslator}
                            onChange={setSelectedEnableTranslator}
                            className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                        >
                            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                        </Switch>
                    </div>
                    <div>
                        <Label htmlFor="transfer_timer" className="mb-1 block font-medium">
                            Transfer Timer (seconds):
                        </Label>
                        <Input
                            id="transfer_timer"
                            name="transfer_timer"
                            type="number"
                            className="mt-1 block w-full"
                            defaultValue={props.account.transfer_timer}
                        />
                    </div>
                    <div>
                        <Label htmlFor="disable_autofill" className="mb-1 block font-medium">
                            Disable Autofill:
                        </Label>
                        <Switch
                            id="disable_autofill"
                            name="disable_autofill"
                            checked={selectedDisableAutofill}
                            onChange={setSelectedDisableAutofill}
                            className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                        >
                            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                        </Switch>
                    </div>
                    <div>
                        <Label htmlFor="recording_mode" className="mb-1 block font-medium">
                            Recording Mode:
                        </Label>
                        <Select>
                            <SelectTrigger id="recording_mode" name="recording_mode" className="w-full">
                                Use system setting
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="one_sided">One sided</SelectItem>
                                <SelectItem value="two_sided">Two sided</SelectItem>
                                <SelectItem value="disabled">Disabled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="caller_callback" className="mb-1 block font-medium">
                            Caller Callback:
                        </Label>
                        <Switch
                            id="caller_callback"
                            name="caller_callback"
                            checked={selectedCallerCallback}
                            onChange={setSelectedCallerCallback}
                            className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                        >
                            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                        </Switch>
                    </div>
                    <div>
                        <Label htmlFor="allow_advanced_feature">
                            Allow Advanced Feature:
                        </Label>
                        <Switch
                            id="allow_advanced_feature"
                            name="allow_advanced_feature"
                            checked={selectedAllowAdvancedFeature}
                            onChange={setSelectedAllowAdvancedFeature}
                            className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                        >
                            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                        </Switch>
                    </div>
                    <div>
                        <Label htmlFor="company_description">
                            Company Description:
                        </Label>
                        <Textarea
                            id="company_description"
                            name="company_description"
                            className="mt-1 block w-full"
                            defaultValue={props.account.company_description}
                        />
                    </div>
                </div>
                <Heading title="PA Routing" />
                <div className="grid grid-cols-2 gap-4 p-4 border rounded-2xl mb-4">
                    <div>
                        <Label htmlFor="taking_calls" className="mb-1 block font-medium">
                            Taking Calls:
                        </Label>
                        <Switch
                            id="taking_calls"
                            name="taking_calls"
                            checked={selectedTakingCalls}
                            onChange={setSelectedTakingCalls}
                            className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                        >
                            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                        </Switch>
                    </div>
                    <div>
                        <Label htmlFor="queue_priority">
                            Queue Priority:
                        </Label>
                        <Select>
                            <SelectTrigger id="queue_priority" name="queue_priority" className="w-full">
                                Select
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="language_support">
                            Language Support:
                        </Label>
                        <Select>
                            <SelectTrigger id="language_support" name="language_support" className="w-full">
                                Select
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="english">English</SelectItem>
                                <SelectItem value="spanish">Spanish</SelectItem>
                                <SelectItem value="english_spanish">English & Spanish</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="product_tier">
                            Product Tier:
                        </Label>
                        <Select>
                            <SelectTrigger id="product_tier" name="product_tier" className="w-full">
                                Select
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="standard">Standard</SelectItem>
                                <SelectItem value="premium">Premium</SelectItem>
                                <SelectItem value="enterprise">Enterprise</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Heading title="Account Security Options" />
                <Heading title="Operator Screen Info" />
                <div className="grid grid-cols-2 gap-4 border rounded-2xl p-4 mb-4">
                    <div>
                        <Label htmlFor="company" className="mb-1 block font-medium">
                            Company:
                        </Label>
                        <Input
                            id="company"
                            name="company"
                            type="text"
                            className="mt-1 block w-full"
                            defaultValue={props.account.company}
                        />
                    </div>
                    <div>
                        <Label htmlFor="company_visible" className="mb-1 block font-medium">
                            Company Visible:
                        </Label>
                        <Switch
                            id="company_visible"
                            name="company_visible"
                            checked={selectedCompanyVisible}
                            onChange={setSelectedCompanyVisible}
                            className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                        >
                            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                        </Switch>
                    </div>
                    <div>
                        <Label htmlFor="address1">
                            Address 1:
                        </Label>
                        <Input
                            id="address1"
                            name="address1"
                            type="text"
                            className="mt-1 block w-full"
                            defaultValue={props.account.address1}
                        />
                    </div>
                    <div>
                        <Label htmlFor="address1_visible" className="mb-1 block font-medium">
                            Address Visible:
                        </Label>
                        <Switch
                            id="address_visible"
                            name="address_visible"
                            checked={selectedAddressVisible}
                            onChange={setSelectedAddressVisible}
                            className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                        >
                            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                        </Switch>
                    </div>
                    <div className="col-span-2">
                        <Label htmlFor="address2">
                            Address 2:
                        </Label>
                        <Input
                            id="address2"
                            name="address2"
                            type="text"
                            className="mt-1 block w-full"
                            defaultValue={props.account.address2}
                        />
                    </div>
                    <></>
                    <div>
                        <Label htmlFor="city">
                            City:
                        </Label>
                        <Input
                            id="city"
                            name="city"
                            type="text"
                            className="mt-1 block w-full"
                            defaultValue={props.account.city}
                        />
                    </div>
                    <></>
                    <div>
                        <Label htmlFor="county">
                            County:
                        </Label>
                        <Input
                            id="county"
                            name="county"
                            type="text"
                            className="mt-1 block w-full"
                            defaultValue={props.account.county}
                        />
                    </div>
                    <></>
                    <div>
                        <Label htmlFor="postcode">
                            Postcode:
                        </Label>
                        <Input
                            id="postcode"
                            name="postcode"
                            type="text"
                            className="mt-1 block w-full"
                            defaultValue={props.account.postcode}
                        />
                    </div>
                    <></>
                    <div>
                        <Label htmlFor="country">
                            Country:
                        </Label>
                        <Select>
                            <SelectTrigger id="country" name="country" className="w-full">
                                Select
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="US">United States</SelectItem>
                                <SelectItem value="GB">United Kingdom</SelectItem>
                                <SelectItem value="IE">Ireland</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <></>
                    <div>
                        <Label htmlFor="email">
                            Email:
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            className="mt-1 block w-full"
                            defaultValue={props.account.email}
                        />
                    </div>
                    <div>
                        <Label htmlFor="email_visible" className="mb-1 block font-medium">
                            Email Visible:
                        </Label>
                        <Switch
                            id="email_visible"
                            name="email_visible"
                            checked={selectedEmailVisible}
                            onChange={setSelectedEmailVisible}
                            className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                        >
                            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                        </Switch>
                    </div>
                    <div>
                        <Label htmlFor="main_phone">
                            Main Phone:
                        </Label>
                        <Input
                            id="main_phone"
                            name="main_phone"
                            type="text"
                            className="mt-1 block w-full"
                            defaultValue={props.account.main_phone}
                        />
                    </div>
                    <div>
                        <Label htmlFor="main_phone_visible" className="mb-1 block font-medium">
                            Main Phone Visible:
                        </Label>
                        <Switch
                            id="main_phone_visible"
                            name="main_phone_visible"
                            checked={selectedMainPhoneVisible}
                            onChange={setSelectedMainPhoneVisible}
                            className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                        >
                            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                        </Switch>
                    </div>
                    <div>
                        <Label htmlFor="main_fax">
                            Main Fax:
                        </Label>
                        <Input
                            id="main_fax"
                            name="main_fax"
                            type="text"
                            className="mt-1 block w-full"
                            defaultValue={props.account.main_fax}
                        />
                    </div>
                    <div>
                        <Label htmlFor="main_fax_visible" className="mb-1 block font-medium">
                            Main Fax Visible:
                        </Label>
                        <Switch
                            id="main_fax_visible"
                            name="main_fax_visible"
                            checked={selectedMainFaxVisible}
                            onChange={setSelectedMainFaxVisible}
                            className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                        >
                            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                        </Switch>
                    </div>
                    <div>
                        <Label htmlFor="alt_phone">
                            Alt Phone:
                        </Label>
                        <Input
                            id="alt_phone"
                            name="alt_phone"
                            type="text"
                            className="mt-1 block w-full"
                            defaultValue={props.account.alt_phone}
                        />
                    </div>
                    <div>
                        <Label htmlFor="alt_phone_visible" className="mb-1 block font-medium">
                            Alt Phone Visible:
                        </Label>
                        <Switch
                            id="alt_phone_visible"
                            name="alt_phone_visible"
                            checked={selectedAltPhoneVisible}
                            onChange={setSelectedAltPhoneVisible}
                            className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                        >
                            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                        </Switch>
                    </div>
                    <div>
                        <Label htmlFor="website">
                            Website:
                        </Label>
                        <Input
                            id="website"
                            name="website"
                            type="text"
                            className="mt-1 block w-full"
                            defaultValue={props.account.website}
                        />
                    </div>
                    <div>
                        <Label htmlFor="website_visible" className="mb-1 block font-medium">
                            Website Visible:
                        </Label>
                        <Switch
                            id="website_visible"
                            name="website_visible"
                            checked={selectedWebsiteVisible}
                            onChange={setSelectedWebsiteVisible}
                            className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                        >
                            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                        </Switch>
                    </div>
                    <div>
                        <Label htmlFor="hours" className="mb-1 block font-medium">
                            Hours:
                        </Label>
                        <Textarea
                            id="hours"
                            name="hours"
                            className="mt-1 block w-full"
                            defaultValue={props.account.hours}
                        />
                    </div>
                    <div>
                        <Label htmlFor="hours_visible" className="mb-1 block font-medium">
                            Hours Visible:
                        </Label>
                        <Switch
                            id="hours_visible"
                            name="hours_visible"
                            checked={selectedHoursVisible}
                            onChange={setSelectedHoursVisible}
                            className={`group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-checked:bg-mp-orange`}
                        >
                            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-checked:translate-x-6" />
                        </Switch>
                    </div>
                </div>
                <Button type="submit" className="mt-4">
                    Save Changes
                </Button>
            </Form>
        </div>
    )
}

export { BasicInfo };