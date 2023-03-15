$(document).ready(function () {
    function createTimeBlocks() {
      const startHour = 9;
      const endHour = 17;
      const timeBlocksContainer = $('.time-blocks');
  
      for (let hour = startHour; hour <= endHour; hour++) {
        const timeBlock = $('<div>')
          .addClass('row time-block')
          .attr('id', `hour-${hour}`);
        
        const hourLabel = $('<div>').addClass('col-md-1 hour').text(moment(hour, 'H').format('hA'));
        const description = $('<textarea>').addClass('col-md-10 description').val(localStorage.getItem(`hour-${hour}`));
        const saveBtn = $('<button>').addClass('btn saveBtn col-md-1').html('<i class="fas fa-save"></i>');
  
        timeBlock.append(hourLabel, description, saveBtn);
        timeBlocksContainer.append(timeBlock);
      }
    }
  
    function updateHourColors() {
      const currentHour = moment().hour();
  
      $('.time-block').each(function () {
        const blockHour = parseInt($(this).attr('id').split('-')[1]);
  
        $(this).removeClass('past present future');
  
        if (blockHour < currentHour) {
          $(this).addClass('past');
        } else if (blockHour === currentHour) {
          $(this).addClass('present');
        } else {
          $(this).addClass('future');
        }
      });
    }
  
    $('.time-blocks').on('click', '.saveBtn', function () {
      const value = $(this).siblings('.description').val();
      const time = $(this).parent().attr('id');
  
      localStorage.setItem(time, value);
    });
  
    createTimeBlocks();
    updateHourColors();
  
    const interval = setInterval(updateHourColors, 15000);
    $('#today').text(moment().format('dddd, MMMM Do'));
  });
  