import DeleteResource from './DeleteResource';
import AccountsController from '@/actions/App/Http/Controllers/AccountsController';

function DeleteAccount(props: { accountId: number }) {
    const form = {...AccountsController.destroy.form(props.accountId)};
    return (
        <DeleteResource
            resourceName="account"
            resourceId={props.accountId}
            form={form}
        />
    );
}

export default DeleteAccount;