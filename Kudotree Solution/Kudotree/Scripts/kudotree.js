var NetworkToRemoveId = 0;
var ConnectionToRemoveId = 0;

$(document).ready(function () {

    //List by dropdown is selected
    $('#ktListBy, #ktSortBy').on('change', function () {
        $('#frmKudotree').submit();
    });

    //Form is submitted
    $('#frmKudotree').on('submit', function () {
        $('#divLoading').collapse('show');
    });

    //Sort Ascending
    $('#lnkOrderByAsc').on('click', function () {
        $('#ktSortDirection').val('asc');
        $('#frmKudotree').submit();
    });

    //Sort Descending
    $('#lnkOrderByDesc').on('click', function () {
        $('#ktSortDirection').val('desc');
        $('#frmKudotree').submit();
    });

    //Remove Connection
    $('.btnRemoveConn').on('click', function () {
        ConnectionToRemoveId = $(this).attr('data-id');
        ConfirmOkDelegate = RemoveConnection;

        $('#modalConfirmOkMsg').text('Are you sure you want to remove connection: ' + $(this).attr('data-msg') + '?');
        $('#modalConfirm').modal('show');
    });

    //Set focus on Name box of modal
    $('#modalAddNetwork').on('shown.bs.modal', function () {
        $('#ktNetworkName').focus();
    });

    //Remove Network
    $('.ktRemNet').on('click', function () {
        NetworkToRemoveId = $(this).attr('data-id');
        ConfirmOkDelegate = RemoveNetwork;

        $('#modalConfirmOkMsg').text('Are you sure you want to remove network: ' + $(this).attr('data-msg') + '?');
        $('#modalConfirm').modal('show');
    });

    //Edit Network link, load id to update in hidden form field
    $('.ktEditNet').on('click', function(){
        $('#ktNetIdToUpdate').val($(this).attr('data-id-to-update'));
        $('#ktNetworkNameEdit').val($(this).attr('data-name'));
        $('#ktIsPreferredNetworkEdit').prop('checked', $(this).attr('data-ispreferred') == 'True' ? 'checked' : '');
    });

    //Edit Network modal is open, set focus
    $('#modalEditNetwork').on('shown.bs.modal', function () {
        $('#ktNetworkNameEdit').focus();
    });

    //Add to Network
    $('.btnAddToNet').on('click', function () {
        $('#ktIdForRegNets').val($(this).attr('data-id'));
        $('#spanAddToNetworkTitle').text($(this).attr('data-name'));

        var networks = $(this).attr('data-networks');

        $('input[name="ArrPrefNets"]').each(function (index, item) {
            var val = $(item).val();

            if (networks.indexOf(val) > -1) {
                $(this).prop('checked', true);
            }
            else {
                $(this).prop('checked', false);
            }
        });
    });

    //Create Network button click
    $('.btnSubmitForm').on('click', function () {
        $(this).html('<img src="/images/loading.gif" style="height:30px;" />');
    });
});

function RemoveNetwork() {
    $('#ktNetworkIdToRemove').val(NetworkToRemoveId);
    $('#frmKudotree').submit();
}

function RemoveConnection() {
    console.log('ConnectionToRemoveId: ' + ConnectionToRemoveId);

    $('#ktIdToRemove').val(ConnectionToRemoveId);
    $('#frmKudotree').submit();
}