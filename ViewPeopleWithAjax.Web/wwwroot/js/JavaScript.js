

$(() => {

    loadPeople();

    function loadPeople() {
        $.get('/home/getall', function (people) {
            $("#people-table tr:gt(0)").remove();
            people.forEach(person => {
                $("#people-table tbody").append(`
<tr>
    <td>${person.firstName}</td>
    <td>${person.lastName}</td>
    <td>${person.age}</td>
    <td>
        <button class="btn btn-warning btn-block" data-id = ${person.id} data-first-name = ${person.firstName} data-last-name = ${person.lastName} data-age = ${person.age} id = "edit-person" > Edit</button >
    </td>
    <td>
        <button class="btn btn-danger btn-block" id="delete-person" data-id = ${person.id} > Delete</button >
    </td>

</tr>`);
            });
        });
    }

    $("#add-person").on('click', function () {
        const firstName = $("#first-name").val();
        const lastName = $("#last-name").val();
        const age = $("#age").val();


        $.post('/home/addperson', { firstName, lastName, age }, function (person) {
            //console.log(person.id);
            loadPeople();
            $("#first-name").val('');
            $("#last-name").val('');
            $("#age").val('');
        });
    });
    $("#people-table").on('click', "#edit-person", function () {
        const button = $(this);
        const id = button.data('id');
        const firstName = button.data('first-name');
        const lastName = button.data('last-name');
        const age = button.data('age');

        $("#edit-first-name").val(firstName);
        $("#edit-last-name").val(lastName);
        $("#edit-age").val(age);
        $('.modal').data('person-id', id);

        $(".modal").modal();

        $("#save").on('click', function () {
            const firstName = $("#edit-first-name").val();
            const lastName = $("#edit-last-name").val();
            const age = $("#edit-age").val();
            const id = $('.modal').data('person-id');
            console.log(id);
            $.post('/home/EditPerson', { id, firstName, lastName, age }, function () {
                loadPeople();
                $(".modal").modal('hide');
            });

        });
    });
    $("#people-table").on('click', "#delete-person", function () {
        const button = $(this);
        const id = button.data('id');
        $.post('/home/deletePerson', { id }, function () {
            loadPeople();

        });
    });
});

