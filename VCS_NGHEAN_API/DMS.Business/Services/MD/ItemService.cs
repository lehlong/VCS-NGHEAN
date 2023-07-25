﻿using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Filter.MD;
using DMS.CORE;
using DMS.CORE.Entities.BU;
using DMS.CORE.Entities.MD;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.MD
{
    public interface IItemService : IGenericService<tblMdItem, tblItemDto>
    {
        Task<PagedResponseDto> Search(ItemFilter filter);

        Task Update(tblItemUpdateDto item);

        Task<IList<tblItemDto>> GetAll(ItemFilterLite filter);
    }
    public class ItemService : GenericService<tblMdItem, tblItemDto>, IItemService
    {
        public ItemService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<PagedResponseDto> Search(ItemFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdItem.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Code.Contains(filter.KeyWord) ||
                        x.Name.Contains(filter.KeyWord)
                    );
                }
                if (!string.IsNullOrWhiteSpace(filter.TypeCode))
                {
                    query = query.Where(x => x.TypeCode.Contains(filter.TypeCode));
                }
                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }
                query = query.OrderBy(x => x.Code);
                return await this.Paging(query, filter);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<IList<tblItemDto>> GetAll(ItemFilterLite filter)
        {
            try
            {
                var query = this._dbContext.tblMdItem.AsQueryable();

                if (!string.IsNullOrWhiteSpace(filter.TypeCode))
                {
                    query = query.Where(x => x.TypeCode.Contains(filter.TypeCode));
                }
                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }
                query = query.OrderBy(x => x.Code);
                return _mapper.Map<IList<tblItemDto>>(await query.ToListAsync());
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task Update(tblItemUpdateDto item)
        {
            try
            {
                var itemInDB = await this._dbContext.Set<tblMdItem>()
                                         .Include(i => i.ItemFormula)
                                         .FirstOrDefaultAsync(i => i.Code == item.Code);

                if (itemInDB == null)
                {
                    this.Status = false;
                    this.MessageObject.Code = "0003";
                    return;
                }
                else
                {
                    var itemFormula = itemInDB.ItemFormula;

                    if (itemFormula == null)
                    {
                        this._mapper.Map(item, itemInDB);
                        var newFormula = _mapper.Map<tblBuItemFormula>(item.ItemFormula);
                        await this._dbContext.Set<tblBuItemFormula>().AddAsync(newFormula);
                        await this._dbContext.SaveChangesAsync();
                    }
                    else
                    {
                        this._mapper.Map(item, itemInDB);
                        this._mapper.Map(item.ItemFormula, itemFormula);
                        await this._dbContext.SaveChangesAsync();
                    }
                }
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
            }
        }
    }
}
